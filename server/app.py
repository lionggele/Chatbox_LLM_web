# Logic to get the API  for LLM model 
# Reference: https://medium.com/@abed63/flask-application-with-openai-chatgpt-integration-tutorial-958588ac6bdf

import os
import json  
from flask import Flask, request, jsonify
from flask_cors import CORS
import boto3
import openai
from botocore.exceptions import ClientError
from handlers import get_handler
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables from .flaskenv file
load_dotenv('.flaskenv')

app = Flask(__name__)
CORS(app)

## OPEN AI
# Fetch OpenAI API Key once during initialization
def get_open_api_key():
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
secret = get_open_api_key()
if secret:
    api_key = json.loads(secret)["OPENAI_API_KEY"].strip() 
    openai.api_key = api_key
    print(f"Retrieved API Key: {api_key}") 
else:
    raise Exception("Failed to retrieve the OpenAI API key from Secrets Manager")


## Google Gemini
# Access environment variables
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
PROJECT_NUMBER = os.getenv('PROJECT_NUMBER')

# Gemini 
def call_gemini_model(user_query):
    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
      
        response = model.generate_content(
            user_query,
            generation_config=genai.types.GenerationConfig(
                candidate_count=1,
                max_output_tokens=100,
                temperature=1.0,
            ),
        )
        response = {"message": response.text}
        return response
    except Exception as e:
        raise Exception(f"Error generating content with Gemini model: {str(e)}")

# Open AI
def call_gpt_model(user_query, model):
    try:
        print(f"User query: {user_query}")
        print(f"Selected model GPT: {model}")
        openai_response = openai.ChatCompletion.create(
            model=model,
            messages=[
                {"role": "user", "content": user_query}
            ]
        )
        response_text = openai_response['choices'][0]['message']['content'].strip()
        response = {"message": response_text}
        return response
    except Exception as e:
        raise Exception(f"Error generating content with GPT model: {str(e)}")

# Store the selected model in a global variable
selected_model = "gpt-4o-2024-08-06"
selected_model_container1 = "gemini-1.5-flash"
selected_model_container2 =  "gpt-4o-2024-08-06"

# Endpoint to set the model
@app.route('/set-model', methods=['POST'])
def set_model():
    global selected_model_container1, selected_model_container2

    data = request.json
    model = data.get("model")
    print(f"Selected model : {selected_model}")
    container = request.args.get("container") 

    if container == "container1":
        selected_model_container1 = model
        print(f"Selected model for container 1: {selected_model_container1}")
    elif container == "container2":
        selected_model_container2 = model
        print(f"Selected model for container 2: {selected_model_container2}")
    else:
        return jsonify({"error": "Invalid container"}), 400

    return jsonify({"status": "success", "selected_model": model})
    # return jsonify({"status": "success", "selected_model": selected_model})


@app.route('/api/ask', methods=['POST'])
def ask_model():
    global selected_model
    global selected_model_container1, selected_model_container2
    container = request.json.get("container") 
    user_query = request.json.get("query")
    
    if not user_query or not container:
        return jsonify({"error": "Query or container missing"}), 400

    print(f"container:{container}")
    
    # Send query to the appropriate model
    if container == "container1":
        selected_model = selected_model_container1
    elif container == "container2":
        selected_model = selected_model_container2
    else:
        return jsonify({"error": "Invalid container"}), 400

    if not selected_model:
        return jsonify({"error": "No model selected"}), 400
    
    if selected_model == "gemini-1.5-flash":
        try:
            print(f"User query: {user_query}")
            print(f"Selected model (gemini): {selected_model}")
            response_text = call_gemini_model(user_query)
            print(f"response: {response_text}")
            return jsonify(response_text)
        except Exception as e:
            return jsonify({'error': str(e)}), 500      
    else:
        try:
            print(f"Selected model (GPT 2): {selected_model}")
            response_text = call_gpt_model(user_query, selected_model)
            return jsonify(response_text)
        except Exception as e:
            return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")

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