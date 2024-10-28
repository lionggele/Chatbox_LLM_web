# Reference: https://shwinda.medium.com/build-a-full-stack-llm-application-with-openai-flask-react-and-pinecone-part-1-f3844429a5ef

<<<<<<< HEAD
from flask import Blueprint, request, jsonify
from service.llm_service import OpenAIEngine, GoogleVertexAIEngine, AnthropicEngine, MistralAIEngine
=======
from datetime import datetime as dt
import json
from flask import Blueprint, app, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from service.llm_service import OpenAIEngine, GoogleVertexAIEngine, AnthropicEngine, MistralAIEngine
from utils.sampling import sample_dataset
from service.eval_service import evaluate_llm_responses
from utils.db_postgresql import db, EvaluationResult, ExperimentResult
from collections import defaultdict
>>>>>>> feature-branch

api_blueprint = Blueprint('api', __name__)

engines = {
    "openai": OpenAIEngine(),
    "googlevertex": GoogleVertexAIEngine(),
<<<<<<< HEAD
    "anthropic": AnthropicEngine(),
    "mistral" : MistralAIEngine()
=======
    "mistral" : MistralAIEngine(),
    "anthropic": AnthropicEngine()
>>>>>>> feature-branch
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

<<<<<<< HEAD
=======
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
        # Generate an experiment ID
        timestamp = dt.now().strftime("%Y%m%d_%H%M%S")
        experiment_id = f"{selected_dataset}_{selected_sampling}_{selected_model}_{timestamp}"
        # Sample the dataset
        sampled_data = sample_dataset(selected_dataset, selected_sampling)
    
        # Prepare questions for LLM
        qa_pairs = [{
            "id": qa["id"],
            "context": qa['context'],
            "question": qa['question'],
            "answer": qa['answer']
        } for qa in sampled_data]

        # Send questions to the selected LLM
        engine = engines.get(selected_model)
        if not engine:
            return jsonify({"error": f"Model '{selected_model}' not found."}), 400

        responses = []
        for qa in qa_pairs:
            response = engine.send(f"Question: {qa['question']}\nContext: {qa['context']}")
            responses.append({
                "id": qa["id"],
                "experiment_id": experiment_id,  # Add experiment_id here
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

        # Evaluate the responses (F1 and BLEU scores) and save locally
        evaluation_output_file = f'./dataset/{selected_dataset}_evaluation_results.json'
        print(f"Evaluating responses and saving to {evaluation_output_file}")
        result_data = evaluate_llm_responses(qa_pairs, [resp['llm_response'] for resp in responses], evaluation_output_file,experiment_id)

        evaluation_results = result_data["evaluation_results"]
        average_f1_score = result_data["average_metrics"]["average_f1_score"]
        average_bleu_score = result_data["average_metrics"]["average_bleu_score"]

        # Save evaluation results to the database
        for eval_result in evaluation_results:
            result_entry = EvaluationResult(
                experiment_id=experiment_id,
                context=eval_result["context"],
                question=eval_result["question"],
                correct_answer=eval_result["correct_answer"],
                llm_response=eval_result["llm_response"],
                f1_score=eval_result["f1_score"],
                bleu_score=eval_result["bleu_score"]
            )
            db.session.add(result_entry)
        print(f"Saved {len(evaluation_results)} evaluation results to the database.")

        # Save experiment summary to ExperimentResult table
        experiment_entry = ExperimentResult(
            experiment_id=experiment_id,
            average_f1_score=average_f1_score,
            average_bleu_score=average_bleu_score
        )
        db.session.add(experiment_entry)

        db.session.commit()
        print(f"Experiment {experiment_id} saved with average F1 score: {average_f1_score}, average BLEU score: {average_bleu_score}.")


        

        # Save and return results
        return jsonify({"evaluation_results": evaluation_results,"experiment_id": experiment_id})

    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    
@api_blueprint.route('/get_evaluation_results', methods=['GET'])
def get_evaluation_results():
    try:
        results = EvaluationResult.query.all()
        response_data = [
            {
                "id": result.id,
                "experiment_id":result.experiment_id,
                "context": result.context,
                "question": result.question,
                "correct_answer": result.correct_answer,
                "llm_response": result.llm_response,
                "f1_score": result.f1_score,
                "bleu_score": result.bleu_score
            } for result in results
        ]
        return jsonify(response_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api_blueprint.route('/get_model_averages', methods=['GET'])
def get_model_averages():
    try:
        print("Endpoint '/api/get_model_averages' was hit")  # Debug statement
        dataset = request.args.get('dataset', default='SQuAD', type=str)
        model_name = request.args.get('model', default='', type=str)
        print(f"Dataset received: {dataset}, Model received: {model_name}")

        # Assuming EvaluationResult is a model from SQLAlchemy
        query = EvaluationResult.query.filter(EvaluationResult.experiment_id.contains(dataset))
        if model_name:
            query = query.filter(EvaluationResult.experiment_id.contains(model_name))

        results = query.all()
        print(f"Number of results fetched: {len(results)}")

        model_scores = defaultdict(lambda: {"total_f1": 0, "total_bleu": 0, "count": 0})

        for result in results:
            # Print the result to see available attributes
            print(vars(result))  # This will print all attributes of the `result` object
            model_name_extracted = result.experiment_id.split('_')[2]
            model_scores[model_name_extracted]["total_f1"] += result.f1_score or 0
            model_scores[model_name_extracted]["total_bleu"] += result.bleu_score or 0
            model_scores[model_name_extracted]["count"] += 1

        response_data = [
            {
                "model": model,
                "average_f1_score": data["total_f1"] / data["count"] if data["count"] > 0 else 0,
                "average_bleu_score": data["total_bleu"] / data["count"] if data["count"] > 0 else 0,
            } for model, data in model_scores.items()
        ]

        response_data = sorted(response_data, key=lambda x: x['average_f1_score'], reverse=True)
        print("Response data:", response_data)

        return jsonify(response_data)

    except Exception as e:
        print(f"General Error: {str(e)}")
        return jsonify({"error": str(e)}), 500



>>>>>>> feature-branch

