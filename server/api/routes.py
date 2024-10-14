# Reference: https://shwinda.medium.com/build-a-full-stack-llm-application-with-openai-flask-react-and-pinecone-part-1-f3844429a5ef

from flask import Blueprint, request, jsonify
from service.llm_service import OpenAIEngine, GoogleVertexAIEngine, AnthropicEngine, MistralAIEngine

api_blueprint = Blueprint('api', __name__)

engines = {
    "openai": OpenAIEngine(),
    "googlevertex": GoogleVertexAIEngine(),
    "anthropic": AnthropicEngine(),
    "mistral" : MistralAIEngine()
}

@api_blueprint.route('/query', methods=['POST'])
def query_llms():
    data = request.get_json()
    query = data.get("query")
    selected_models = data.get("models")

    if not query:
        return jsonify({"error": "No query provided."}), 400

    if not selected_models:
        return jsonify({"error": "No models selected."}), 400

    responses = {}
    for model_name in selected_models:
        engine = engines.get(model_name)
        if engine:
            response = engine.send(query)
            responses[model_name] = response.text  
        else:
            responses[model_name] = f"Error: Model '{model_name}' not found."

    return jsonify(responses)


