
## Reference: https://huggingface.co/spaces/evaluate-metric/squad

import json
import re
import string
from nltk.translate.bleu_score import sentence_bleu
from collections import Counter

# File paths
sampled_squad_file = '../dataset/sampled_SQuAD_data2.json'
llm_responses_file = '../dataset/llm_responses.json'


with open(sampled_squad_file, 'r') as f:
    squad_data = json.load(f)["sampled_data"]

with open(llm_responses_file, 'r') as f:
    llm_responses = json.load(f)["responses"]

def normalize_text(text):
    text = text.lower()
    text = re.sub(f"[{string.punctuation}]", "", text)
    return text

# Exact Match (EM)
def exact_match_score(prediction, ground_truth):
    return int(normalize_text(prediction) == normalize_text(ground_truth))

# F1 Score
def f1_score(prediction, ground_truth):
    prediction_tokens = normalize_text(prediction).split()
    ground_truth_tokens = normalize_text(ground_truth).split()
    
    common = Counter(prediction_tokens) & Counter(ground_truth_tokens)
    num_same = sum(common.values())

    if len(prediction_tokens) == 0 or len(ground_truth_tokens) == 0:
        # If either is empty, F1 is 0 unless they are both empty
        return int(prediction_tokens == ground_truth_tokens)

    if num_same == 0:
        return 0

    precision = num_same / len(prediction_tokens)
    recall = num_same / len(ground_truth_tokens)
    f1 = (2 * precision * recall) / (precision + recall)
    return f1

# # Calculate BLEU Score
# def bleu_score(prediction, ground_truth):
#     prediction_tokens = normalize_text(prediction).split()
#     ground_truth_tokens = [normalize_text(ground_truth).split()]  # Wrap in a list for sentence_bleu
#     return sentence_bleu(ground_truth_tokens, prediction_tokens)


from nltk.translate.bleu_score import sentence_bleu, SmoothingFunction

# Calculate BLEU Score with smoothing
def bleu_score(prediction, ground_truth):
    prediction_tokens = normalize_text(prediction).split()
    ground_truth_tokens = [normalize_text(ground_truth).split()]  # Wrap in a list for sentence_bleu
    smoothie = SmoothingFunction().method4
    return sentence_bleu(ground_truth_tokens, prediction_tokens, smoothing_function=smoothie)

# Rest of your script remains the same...


# Evaluation results
evaluation_results = []

# Iterate through each response and compare with the ground truth
for i, (squad_entry, llm_response) in enumerate(zip(squad_data, llm_responses)):
    correct_answer = squad_entry[4]  
    response_text = llm_response.get('openai', '')  

    # Calculate metrics
    em = exact_match_score(response_text, correct_answer)
    f1 = f1_score(response_text, correct_answer)
    bleu = bleu_score(response_text, correct_answer)

    # Store the results
    evaluation_results.append({
        "id": squad_entry[0],
        "question": squad_entry[3],
        "correct_answer": correct_answer,
        "llm_response": response_text,
        "exact_match": em,
        "f1_score": f1,
        "bleu_score": bleu
    })

# Print evaluation summary
total_em = sum(result["exact_match"] for result in evaluation_results)
total_f1 = sum(result["f1_score"] for result in evaluation_results)
total_bleu = sum(result["bleu_score"] for result in evaluation_results)

num_responses = len(evaluation_results)
average_em = (total_em / num_responses) * 100
average_f1 = (total_f1 / num_responses)
average_bleu = (total_bleu / num_responses)

print(f"Average Exact Match (EM): {average_em:.2f}%")
print(f"Average F1 Score: {average_f1:.2f}")
print(f"Average BLEU Score: {average_bleu:.2f}")

# Save evaluation results to a JSON file
comparison_output_file = 'evaluation_results.json'
with open(comparison_output_file, 'w') as f:
    json.dump(evaluation_results, f, indent=2)

print(f"Evaluation results have been saved to {comparison_output_file}")
