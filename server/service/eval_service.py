<<<<<<< HEAD
## Reference: https://huggingface.co/spaces/evaluate-metric/squad

import json
import csv
import re
import requests
from evaluate import load
import string
from nltk.translate.bleu_score import sentence_bleu, SmoothingFunction

# File paths
sampled_output_file = '../dataset/sampled_SQuAD_data.json' 
csv_output_file = '../dataset/squad_output.csv'  

# Allow user to select JSON or CSV file for LLM processing
print("\nSelect file to send to LLM:")
print("1. JSON file")
print("2. CSV file")
file_choice = input("Enter your choice (1 or 2): ")

selected_file = None
if file_choice == '1':
    selected_file = sampled_output_file
elif file_choice == '2':
    selected_file = csv_output_file
else:
    print("Invalid choice. Exiting...")
    exit()

# Prepare data to send to LLM
qa_pairs = []
if selected_file.endswith('.json'):
    with open(selected_file, 'r') as f:
        sampled_data = json.load(f).get('sampled_data', [])
        for qa in sampled_data:
            qa_pairs.append({
                "id": qa[0],
                "title": qa[1],
                "context": qa[2],
                "question": qa[3],
                "answer": qa[4]
            })
elif selected_file.endswith('.csv'):
    with open(selected_file, 'r', newline='', encoding='utf-8') as csvfile:
        reader = csv.reader(csvfile)
        next(reader) 
        for row in reader:
            qa_pairs.append({
                "id": row[0],
                "title": row[1],
                "context": row[2],
                "question": row[3],
                "answer": row[4]
            })

# Send questions to LLM via route.py
api_url = "http://localhost:5000/api/query"  
print("\nSelect models to use (comma-separated, e.g., openai,googlevertex):")
print("Available models: openai, googlevertex, anthropic, mistral")
model_choice = input("Enter your choice: ")
selected_models = [model.strip() for model in model_choice.split(',') if model.strip() in ["openai", "googlevertex", "anthropic", "mistral"]]

if not selected_models:
    print("Invalid models selected. Exiting...")
    exit()

responses = []
for qa in qa_pairs:
    message = f"Answer concisely: Question: {qa['question']}\nContext: {qa['context']}"
    payload = {
        "query": message,
        "models": selected_models
    }
    try:
        response = requests.post(api_url, json=payload)
        if response.status_code == 200:
            response_data = response.json()
            responses.append({
                "id": qa["id"],
                "title": qa["title"],
                "context": qa["context"],
                "question": qa["question"],
                "correct_answer": qa["answer"],
                "llm_response": response_data
            })
        else:
            responses.append({
                "id": qa["id"],
                "title": qa["title"],
                "context": qa["context"],
                "question": qa["question"],
                "correct_answer": qa["answer"],
                "error": f"Failed to get response for question: {qa['question'][:50]}..."
            })
    except requests.exceptions.RequestException as e:
        responses.append({"error": str(e)})

# Save LLM responses to a new JSON file
responses_output_file = '../dataset/llm_responses.json'
with open(responses_output_file, 'w') as f:
    json.dump(responses, f, indent=2)

print(f"LLM responses have been saved to {responses_output_file}")

## can use the  regexes_to_ignore=["the ", "yell", "YELL"], ignore_case=True, ignore_punctuation=True) instead of the extra function
=======
import json
import evaluate
import os
import re
import string
from nltk.translate.bleu_score import sentence_bleu, SmoothingFunction

# Load the SQuAD metric
squad_metric = evaluate.load("squad")

>>>>>>> feature-branch
def normalize_answer(s):
    """Lower text and remove punctuation, articles, and extra whitespace."""
    def remove_articles(text):
        return re.sub(r'\b(a|an|the)\b', ' ', text)
    
    def white_space_fix(text):
        return ' '.join(text.split())
    
    def remove_punctuation(text):
        return ''.join(ch for ch in text if ch not in string.punctuation)
    
    def lower(text):
        return text.lower()

    return white_space_fix(remove_articles(remove_punctuation(lower(s))))

<<<<<<< HEAD
# Evaluate responses
squad_metric = load("squad")
evaluation_results = []

for response in responses:
    if "llm_response" in response:
      
        prediction_text = response["llm_response"].get("openai", "")    # Adjust if using different models
        correct_answer = response["correct_answer"]
        
        normalized_prediction = normalize_answer(prediction_text)
        normalized_reference = normalize_answer(correct_answer)

        prediction = {"prediction_text": normalized_prediction, "id": response["id"]}
        reference = {"answers": {"answer_start": [0], "text": [normalized_reference]}, "id": response["id"]}

        # Compute EM, F1, and BLEU score
        result = squad_metric.compute(predictions=[prediction], references=[reference])
        #em = result['exact_match']
        f1 = result['f1']
=======
def evaluate_llm_responses(qa_pairs, responses, output_file,experiment_id):
    evaluation_results = []
    total_f1_score = 0
    total_bleu_score = 0

    for qa, response in zip(qa_pairs, responses):
        prediction_text = response 
        correct_answer = qa['answer']
        
        # Normalize prediction and reference
        normalized_prediction = normalize_answer(prediction_text)
        normalized_reference = normalize_answer(correct_answer)

        # Prepare prediction and reference in the required format
        prediction = {"prediction_text": normalized_prediction, "id": qa["id"]}
        reference = {"answers": {"answer_start": [0], "text": [normalized_reference]}, "id": qa["id"]}

        # Compute F1 and BLEU scores
        result = squad_metric.compute(predictions=[prediction], references=[reference])
        f1_score = result['f1']
>>>>>>> feature-branch
        smoothing_function = SmoothingFunction().method1
        bleu_score = sentence_bleu([normalized_reference.split()], normalized_prediction.split(), smoothing_function=smoothing_function)
        
        # Store the evaluation results
        evaluation_results.append({
<<<<<<< HEAD
            "id": response["id"],
            "question": response["question"],
            "correct_answer": response["correct_answer"],
            "llm_response": prediction_text,
            # "exact_match": em,
            "f1_score": f1,
            "bleu_score": bleu_score
        })

# Save evaluation results to a JSON file (Database)
evaluation_output_file = '../dataset/evaluation_results.json'
with open(evaluation_output_file, 'w') as f:
    json.dump(evaluation_results, f, indent=2)

print(f"Evaluation results have been saved to {evaluation_output_file}")
=======
            "id": qa["id"],
            "experiment_id": experiment_id, 
            "context": qa['context'],
            "question": qa['question'],
            "correct_answer": qa['answer'],
            "llm_response": prediction_text,
            "f1_score": f1_score,
            "bleu_score": bleu_score
        })

        total_f1_score += f1_score
        total_bleu_score += bleu_score
    
    # Calculate average scores
    average_f1_score = total_f1_score / len(qa_pairs) if qa_pairs else 0
    average_bleu_score = total_bleu_score / len(qa_pairs) if qa_pairs else 0

    average_metrics = {
        "average_f1_score": average_f1_score,
        "average_bleu_score": average_bleu_score
    }

    # Save evaluation results to a JSON file
    try:
        os.makedirs(os.path.dirname(output_file), exist_ok=True)
        with open(output_file, 'w') as f:
            json.dump({"evaluation_results": evaluation_results, "average_metrics": average_metrics}, f, indent=2)
        print(f"Evaluation results have been saved to {output_file}")
    except Exception as e:
        print(f"Failed to save evaluation results: {e}")

    return {"evaluation_results": evaluation_results, "average_metrics": average_metrics}
>>>>>>> feature-branch
