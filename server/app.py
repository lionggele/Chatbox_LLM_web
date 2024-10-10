# Logic to get the API  for LLM model 
# Reference: https://medium.com/@abed63/flask-application-with-openai-chatgpt-integration-tutorial-958588ac6bdf

import json  
from flask import Flask, request, jsonify
from flask_cors import CORS
import boto3
import openai
from botocore.exceptions import ClientError
from handlers import get_handler

app = Flask(__name__)
CORS(app)

# Fetch OpenAI API Key once during initialization
def get_secret():
    secret_name = "onboarding/openai_key"
    region_name = "us-west-2"
    # profile_name = 'llm_comparison'
    service_name = 'secretsmanager'  

    session = boto3.Session()  #profile_name=profile_name 
    client = session.client(service_name=service_name, region_name=region_name)

    try:
        get_secret_value_response = client.get_secret_value(SecretId=secret_name)
        if 'SecretString' in get_secret_value_response:
            return get_secret_value_response['SecretString']
        else:
            return base64.b64decode(get_secret_value_response['SecretBinary'])

    except ClientError as e:
        # Handle specific exceptions
        if e.response['Error']['Code'] == 'ResourceNotFoundException':
            print(f"The requested secret {secret_name} was not found")
        elif e.response['Error']['Code'] == 'InvalidRequestException':
            print(f"The request was invalid due to: {e}")
        elif e.response['Error']['Code'] == 'InvalidParameterException':
            print(f"The request had invalid parameters: {e}")
        elif e.response['Error']['Code'] == 'DecryptionFailure':
            print(f"Could not decrypt the secret: {e}")
        elif e.response['Error']['Code'] == 'InternalServiceError':
            print(f"An internal service error occurred: {e}")
        return None  #

# Store the API key globally for reuse
secret = get_secret()
if secret:
    api_key = json.loads(secret)["OPENAI_API_KEY"].strip() 
    openai.api_key = api_key
    print(f"Retrieved API Key: {api_key}") 
else:
    raise Exception("Failed to retrieve the OpenAI API key from Secrets Manager")

# Store the selected model in a global variable
selected_model = None

# Endpoint to set the model
@app.route('/set-model', methods=['POST'])
def set_model():
    global selected_model
    data = request.json
    selected_model = data.get("model")
    return jsonify({"status": "success", "selected_model": selected_model})


# def ask_model():
#     data = request.json
#     model_name = data.get("model")
#     user_query = data.get("query")

#     try:
#         handler = get_handler(model_name)
#         response = handler.query(user_query)
#     except ValueError as e:
#         return jsonify({"error": str(e)}), 400
#     except Exception as e:
#         print(f"Error sending query to LLM: {str(e)}")
#         response = {"error": str(e)}

#     return jsonify(response)


@app.route('/api/ask', methods=['POST'])
def ask_openai():
    global selected_model
    data = request.json
    user_query = data.get("query")

    if not selected_model:
        return jsonify({"error": "No model selected"}), 400
    
    try:
        print(f"User query: {user_query}")
        print(f"Selected model: {selected_model}")
        openai_response = openai.ChatCompletion.create(
            model = selected_model, 
            messages=[
                {"role": "user", "content": user_query} 
            ]
        ) # we can do some fine tuning here!!!


        print(f"test2:{openai_response}")
        
        # Extract and send the response text
        response_text = openai_response['choices'][0]['message']['content'].strip()
        response = {"message": response_text}
        
    except Exception as e:
        print(f"Error sending query to OpenAI: {str(e)}")
        response = {"error": str(e)}
        

    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")

