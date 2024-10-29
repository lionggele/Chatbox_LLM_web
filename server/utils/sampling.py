import json
import os
import random
import csv
from pathlib import Path

# Define base directory
BASE_DIR = Path(__file__).resolve().parent.parent 
squad_input_file = BASE_DIR / 'dataset' / 'SQuAD-dev-v2.0.json'
truthfulqa_input_file = BASE_DIR / 'dataset' / 'TruthfulQA_dev.csv'

# Generic function to sample dataset
def sample_dataset(dataset_name, sampling_size):
    if dataset_name.lower() == 'squad':
        return sample_squad_dataset(sampling_size)
    elif dataset_name.lower() == 'truthfulqa':
        return sample_truthfulqa_dataset(sampling_size,truthfulqa_input_file)
    else:
        raise ValueError("Unsupported dataset name provided.")

# Function to sample SQuAD dataset
def sample_squad_dataset(sampling_size):
    with open(squad_input_file, 'r') as f:
        data = json.load(f)

    dataset = data.get('data', [])

    qa_pairs = []
    id_counter = 1  

    for article in dataset:
        title = article.get('title', )
        for paragraph in article.get('paragraphs', []):
            context = paragraph.get('context', '')
            for qa in paragraph.get('qas', []):
                question = qa.get('question', '')
                answers = qa.get('answers', [])
                qa_id = qa.get('id', f'id_{id_counter}')
                id_counter += 1

                for answer in answers:
                    answer_text = answer.get('text', '')
                    answer_start = answer.get('answer_start', 0)
                    qa_pairs.append({
                        "id": qa_id,
                        "title": title,
                        "context": context,
                        "question": question,
                        "answer": answer_text,
                        "answer_start": answer_start
                    })

    return write_sampled_data(qa_pairs, sampling_size, dataset_name='squad')

def sample_truthfulqa_dataset(sampling_size, truthfulqa_input_file):
    with open(truthfulqa_input_file, 'r') as f:
        reader = csv.DictReader(f)
        dataset = list(reader)  

    # Collect all QA pairs from the dataset
    qa_pairs = []
    id_counter = 1  

    for item in dataset:
        question = item.get('Question', '')
        answer = item.get('Best Answer', '')
        correct_answers = item.get('Correct Answers', '').split(';') if 'Correct Answers' in item else []  # Split on semicolons or use empty list
        incorrect_answers = item.get('Incorrect Answers', '').split(';') if 'Incorrect Answers' in item else []  # Split on semicolons or use empty list
        category = item.get('Category', '')
        source = item.get('Source', '')

        qa_id = f'id_{id_counter}'
        id_counter += 1

        qa_pairs.append({
            "id": qa_id,
            "question": question,
            "answer": answer,
            "correct_answers": correct_answers,
            "incorrect_answers": incorrect_answers,
            "category": category,
            "source": source
        })

    return write_sampled_data(qa_pairs, sampling_size, dataset_name='truthfulqa', is_truthfulqa=True)


# Function to write sampled data to JSON and CSV
def write_sampled_data(qa_pairs, sampling_size, dataset_name, is_truthfulqa=False):
    sampled_data = random.sample(qa_pairs, min(sampling_size, len(qa_pairs)))
    sampled_output_file = BASE_DIR / 'dataset' / f'sampled_{dataset_name}_data.json'
    csv_output_file = BASE_DIR / 'dataset' / f'{dataset_name}_output.csv'

    os.makedirs(BASE_DIR / 'dataset', exist_ok=True)

    with open(sampled_output_file, 'w') as f:
        json.dump({"sampled_data": sampled_data}, f, indent=2)

    print(f"Sampled {len(sampled_data)} QA pairs and saved to {sampled_output_file}")

    # Prepare CSV headers
    if is_truthfulqa:
        csv_headers = ['id', 'question', 'answer', 'correct_answers', 'incorrect_answers',
                       'category', 'source', 'bleu_score', 'rouge_score']
    else:
        csv_headers = ['id', 'article_title', 'paragraph_context', 'question', 'answer', 'answer_start']

    # Write sampled data to CSV file
    try:
        with open(csv_output_file, 'w', newline='', encoding='utf-8') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(csv_headers)

            for qa_pair in sampled_data:
                if is_truthfulqa:
                    writer.writerow([
                        qa_pair['id'], qa_pair['question'], qa_pair['answer'],
                        qa_pair['correct_answers'], qa_pair['incorrect_answers'],
                        qa_pair['category'], qa_pair['source'], 'N/A', 'N/A'  # Placeholder for BLEU and ROUGE scores
                    ])
                else:
                    writer.writerow([
                        qa_pair['id'], qa_pair['title'], qa_pair['context'],
                        qa_pair['question'], qa_pair['answer'], qa_pair['answer_start']
                    ])

        print(f"Sampled data has been successfully written to {csv_output_file}")
    except PermissionError as e:
        print(f"PermissionError: Unable to write to {csv_output_file}. Ensure no other program is using this file and that you have write permissions.")
    except Exception as e:
        print(f"Failed to write CSV file due to an error: {e}")

    return sampled_data
