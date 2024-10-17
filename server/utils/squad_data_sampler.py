# Reference Dataset: https://paperswithcode.com/dataset/squad

import json
import random
import csv

# File paths
input_file = '../dataset/SQuAD-dev-v2.0.json'  
sampled_output_file = '../dataset/sampled_SQuAD_data.json' 
csv_output_file = '../dataset/squad_output.csv'  

# Number of samples to take
num_samples = 20

# Read the JSON file
with open(input_file, 'r') as f:
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
                qa_pairs.append([qa_id, title, context, question, answer_text, answer_start])

# Take a random sample of 20 QA pairs
sampled_data = random.sample(qa_pairs, min(num_samples, len(qa_pairs)))

# Print out the sampled QA pairs
print("Randomly sampled QA pairs:")
for qa_pair in sampled_data:
    print(f"ID: {qa_pair[0]}\nTitle: {qa_pair[1]}\nContext: {qa_pair[2]}\nQuestion: {qa_pair[3]}\nAnswer: {qa_pair[4]}\nAnswer Start: {qa_pair[5]}\n")

# Write the sampled data to a new JSON file
with open(sampled_output_file, 'w') as f:
    json.dump({"sampled_data": sampled_data}, f, indent=2)

print(f"Sampled {len(sampled_data)} QA pairs and saved to {sampled_output_file}")

# Prepare CSV headers
csv_headers = ['id', 'article_title', 'paragraph_context', 'question', 'answer', 'answer_start']

# Write sampled data to CSV file
with open(csv_output_file, 'w', newline='', encoding='utf-8') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(csv_headers)

    # Write each sampled QA pair to the CSV file
    for qa_pair in sampled_data:
        writer.writerow(qa_pair)

print(f"Sampled data has been successfully written to {csv_output_file}")