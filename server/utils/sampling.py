import json
import random
import csv
from pathlib import Path

# Define base directory
BASE_DIR = Path(__file__).resolve().parent.parent  # This will point to your base directory

# File paths
squad_input_file = BASE_DIR / 'dataset' / 'SQuAD-dev-v2.0.json'
truthfulqa_input_file = BASE_DIR / 'dataset' / 'TruthfulQA.json'

# Generic function to sample dataset
def sample_dataset(dataset_name, sampling_size):
    if dataset_name.lower() == 'squad':
        return sample_squad_dataset(sampling_size)
    elif dataset_name.lower() == 'truthfulqa':
        return sample_truthfulqa_dataset(sampling_size)
    else:
        raise ValueError("Unsupported dataset name provided.")

# Function to sample SQuAD dataset
def sample_squad_dataset(sampling_size):
    # Read the JSON file
    with open(squad_input_file, 'r') as f:
        data = json.load(f)

    dataset = data.get('data', [])

    # Collect all QA pairs from the dataset
    qa_pairs = []
    id_counter = 1  # Initialize a counter for IDs

    for article in dataset:
        title = article.get('title', '')
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

# Function to sample TruthfulQA dataset
def sample_truthfulqa_dataset(sampling_size):
    # Read the JSON file
    with open(truthfulqa_input_file, 'r') as f:
        data = json.load(f)

    dataset = data.get('data', [])

    # Collect all QA pairs from the dataset
    qa_pairs = []
    id_counter = 1  # Initialize a counter for IDs

    for item in dataset:
        question = item.get('question', '')
        answer = item.get('best_answer', '')
        qa_id = f'id_{id_counter}'
        id_counter += 1

        qa_pairs.append({
            "id": qa_id,
            "question": question,
            "answer": answer
        })

    return write_sampled_data(qa_pairs, sampling_size, dataset_name='truthfulqa', is_truthfulqa=True)

# Function to write sampled data to JSON and CSV
def write_sampled_data(qa_pairs, sampling_size, dataset_name, is_truthfulqa=False):
    # Take a random sample of the QA pairs
    sampled_data = random.sample(qa_pairs, min(sampling_size, len(qa_pairs)))

    # Prepare file paths with dataset name
    sampled_output_file = BASE_DIR / 'dataset' / f'sampled_{dataset_name}_data.json'
    csv_output_file = BASE_DIR / 'dataset' / f'{dataset_name}_output.csv'

    # Write the sampled data to a new JSON file
    with open(sampled_output_file, 'w') as f:
        json.dump({"sampled_data": sampled_data}, f, indent=2)

    print(f"Sampled {len(sampled_data)} QA pairs and saved to {sampled_output_file}")

    # Prepare CSV headers
    if is_truthfulqa:
        csv_headers = ['id', 'question', 'answer']
    else:
        csv_headers = ['id', 'article_title', 'paragraph_context', 'question', 'answer', 'answer_start']

    # Write sampled data to CSV file
    with open(csv_output_file, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(csv_headers)

        # Write each sampled QA pair to the CSV file
        for qa_pair in sampled_data:
            if is_truthfulqa:
                writer.writerow([qa_pair['id'], qa_pair['question'], qa_pair['answer']])
            else:
                writer.writerow([qa_pair['id'], qa_pair['title'], qa_pair['context'], qa_pair['question'], qa_pair['answer'], qa_pair['answer_start']])

    print(f"Sampled data has been successfully written to {csv_output_file}")

    return sampled_data
