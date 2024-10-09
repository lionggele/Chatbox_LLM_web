# Logic to get the API  for LLM model 
# Reference: https://medium.com/@abed63/flask-application-with-openai-chatgpt-integration-tutorial-958588ac6bdf

import json  
from flask import Flask, request, jsonify
from flask_cors import CORS
import boto3
import openai
from botocore.exceptions import ClientError

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

# Endpoint for handling a query
@app.route("/api/ask", methods=["POST"])
def ask_openai():
    data = request.json
    user_query = data.get("query")
    print(f"{user_query}")
    
    try:
        print(f"test1:{user_query}")
        openai_response = openai.ChatCompletion.create(
            model='gpt-4', #  here will be the main part to handle different models
            messages=[
                {"role": "user", "content": user_query}  # User input
            ]
        )
        print(f"test2:{openai_response}")
        
        # Extract and send the response text
        response_text = openai_response['choices'][0]['message']['content'].strip()
        response = {"message": response_text}
        print(f"test")
    
    except Exception as e:
        print(f"Error sending query to OpenAI: {str(e)}")
        response = {"error": str(e)}
        

    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
