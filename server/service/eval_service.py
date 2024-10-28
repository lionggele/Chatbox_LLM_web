import json
import evaluate
import os
import re
import string
from nltk.translate.bleu_score import sentence_bleu, SmoothingFunction

# Load the SQuAD metric
squad_metric = evaluate.load("squad")

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

def evaluate_llm_responses_SQuAD(qa_pairs, responses, output_file,experiment_id):
    evaluation_results = []
    total_f1_score = 0
    total_bleu_score = 0

    for qa, response in zip(qa_pairs, responses):
        prediction_text = response 
        correct_answer = qa['answer']
        
        normalized_prediction = normalize_answer(prediction_text)
        normalized_reference = normalize_answer(correct_answer)

        prediction = {"prediction_text": normalized_prediction, "id": qa["id"]}
        reference = {"answers": {"answer_start": [0], "text": [normalized_reference]}, "id": qa["id"]}

        result = squad_metric.compute(predictions=[prediction], references=[reference])
        f1_score = result['f1']
        smoothing_function = SmoothingFunction().method1
        bleu_score = sentence_bleu([normalized_reference.split()], normalized_prediction.split(), smoothing_function=smoothing_function)
        
        evaluation_results.append({
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
    
    average_f1_score = total_f1_score / len(qa_pairs) if qa_pairs else 0
    average_bleu_score = total_bleu_score / len(qa_pairs) if qa_pairs else 0

    average_metrics = {
        "average_f1_score": average_f1_score,
        "average_bleu_score": average_bleu_score
    }

    try:
        os.makedirs(os.path.dirname(output_file), exist_ok=True)
        with open(output_file, 'w') as f:
            json.dump({"evaluation_results": evaluation_results, "average_metrics": average_metrics}, f, indent=2)
        print(f"Evaluation results have been saved to {output_file}")
    except Exception as e:
        print(f"Failed to save evaluation results: {e}")

    return {"evaluation_results": evaluation_results, "average_metrics": average_metrics}

def evaluate_llm_responses_truthfulqa(qa_pairs, responses, output_file, experiment_id):
    from nltk.translate.bleu_score import sentence_bleu
    from rouge_score import rouge_scorer
    import os
    import json

    evaluation_results = []
    total_bleu_score = 0
    total_rouge_score = 0

    scorer = rouge_scorer.RougeScorer(['rougeL'], use_stemmer=True)

    for qa, response in zip(qa_pairs, responses):
        prediction_text = response
        correct_answers = qa['correct_answers']

        bleu_score = max([sentence_bleu([ref.split()], prediction_text.split()) for ref in correct_answers]) if correct_answers else 0
        total_bleu_score += bleu_score

        rouge_scores = [scorer.score(ref, prediction_text)['rougeL'].fmeasure for ref in correct_answers]
        rouge_score = max(rouge_scores) if rouge_scores else 0
        total_rouge_score += rouge_score

        evaluation_results.append({
            "id": qa["id"],
            "experiment_id": experiment_id,
            "question": qa["question"],
            "correct_answer": qa["answer"],
            "llm_response": prediction_text,
            "bleu_score": bleu_score,
            "rouge_score": rouge_score
        })

    average_bleu_score = total_bleu_score / len(qa_pairs) if qa_pairs else 0
    average_rouge_score = total_rouge_score / len(qa_pairs) if qa_pairs else 0

    try:
        os.makedirs(os.path.dirname(output_file), exist_ok=True)
        with open(output_file, 'w') as f:
            json.dump({"evaluation_results": evaluation_results, "average_metrics": {
                "average_bleu_score": average_bleu_score,
                "average_rouge_score": average_rouge_score
            }}, f, indent=2)
        print(f"Evaluation results have been saved to {output_file}")
    except Exception as e:
        print(f"Failed to save evaluation results: {e}")

    return {"evaluation_results": evaluation_results, "average_metrics": {
        "average_bleu_score": average_bleu_score,
        "average_rouge_score": average_rouge_score
    }}
