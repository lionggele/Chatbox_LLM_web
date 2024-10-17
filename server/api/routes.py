# Reference: https://shwinda.medium.com/build-a-full-stack-llm-application-with-openai-flask-react-and-pinecone-part-1-f3844429a5ef

import json
from flask import Blueprint, app, request, jsonify
from service.llm_service import OpenAIEngine, GoogleVertexAIEngine, AnthropicEngine, MistralAIEngine
from utils.sampling import sample_dataset
from service.eval_service import evaluate_llm_responses

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

@api_blueprint.route('/process_dataset', methods=['POST'])
def process_dataset():
    data = request.get_json()
    selected_model = data.get("selectedModel")
    selected_dataset = data.get("selectedDataset")
    selected_sampling = data.get("selectedSampling")

    if not selected_model:
        app.logger.error("No model selected.")
        return jsonify({"error": "No model selected."}), 400

    if not selected_dataset:
        app.logger.error("No dataset selected.")
        return jsonify({"error": "No dataset selected."}), 400

    if not selected_sampling:
        app.logger.error("No sampling size selected.")
        return jsonify({"error": "No sampling size selected."}), 400

    try:
        # Step 1: Sample the dataset
        sampled_data = sample_dataset(selected_dataset, selected_sampling)
    
        # Step 2: Prepare questions for LLM
        qa_pairs = [{
            "id": qa["id"],
            "context": qa['context'],
            "question": qa['question'],
            "answer": qa['answer']
        } for qa in sampled_data]

        # Step 3: Send questions to the selected LLM
        engine = engines.get(selected_model)
        if not engine:
            return jsonify({"error": f"Model '{selected_model}' not found."}), 400

        responses = []
        for qa in qa_pairs:
            response = engine.send(f"Question: {qa['question']}\nContext: {qa['context']}")
            responses.append({
                "id": qa["id"],
                "title": qa.get("title", ""),
                "context": qa["context"],
                "question": qa["question"],
                "correct_answer": qa["answer"],
                "llm_response": response.text
            })

        # Save the responses to a JSON file
        responses_output_file = f'./dataset/{selected_dataset}_llm_responses.json'
        with open(responses_output_file, 'w') as f:
            json.dump(responses, f, indent=2)
        print(f"Responses saved to {responses_output_file}")

        # Step 4: Evaluate the responses (F1 and BLEU scores)
        evaluation_output_file = f'./dataset/{selected_dataset}_evaluation_results.json'
        print(f"Evaluating responses and saving to {evaluation_output_file}")
        evaluation_results = evaluate_llm_responses(qa_pairs, [resp['llm_response'] for resp in responses], evaluation_output_file)

        # Step 5: Save and return results
        return jsonify({"evaluation_results": evaluation_results})

    except ValueError as e:
        return jsonify({"error": str(e)}), 400
