# LLM Performance Comparison Platform

## Introduction

Welcome to the **LLM Performance Comparison Platform**! This project is designed as an internship challenge where you will build a web-based platform allowing users to compare the performance of different Large Language Models (LLMs). This includes both custom queries and standardized evaluation datasets. This project offers hands-on experience with web development, API integration, and AI model evaluation techniques.

## Objective

The objective of this project is to create a platform where users can:

- Input custom queries and send them to multiple LLM APIs.
- View and compare responses from different models.
- Evaluate model performance using standardized datasets and metrics.
- Visualize and analyze the results.

## Core Features

### 1. Frontend Development
The frontend of the platform includes:
- A responsive web interface built with HTML, CSS, and JavaScript.
- An input field for users to send custom queries to multiple LLMs.
- A selection mechanism for choosing which LLMs to query.
- A display area showing responses from each selected LLM.
- A dashboard to view evaluation results and performance metrics.

### 2. Backend Development
The backend handles the API requests and evaluation logic:
- Built with Flask (or Node.js with Express).
- Handles API routes for querying LLMs and processing results.
- Distributes queries to the selected LLM APIs and aggregates the results.
- Supports evaluation datasets and computes performance metrics.

### 3. LLM API Integration
The platform integrates with the following APIs:
- OpenAI GPT API
- Anthropic Claude API
- Meta's LLaMA API (or alternative)

**Features:**
- Secure management of API keys.
- Error handling and rate limiting as per API specifications.
  
### 4. Standardized Evaluation Integration
The platform supports several standardized evaluation datasets:
- **GLUE (General Language Understanding Evaluation)**
- **SuperGLUE**
- **SQuAD**
- **TruthfulQA**
- **MMLU (Massive Multitask Language Understanding)**

The evaluation pipeline:
- Loads tasks from chosen datasets.
- Sends queries to each integrated LLM.
- Collects and stores responses.
- Computes performance metrics as per dataset specifications.

### 5. Results Display and Visualization
The platform includes:
- A comparison interface for side-by-side evaluation of LLM responses to custom queries.
- A performance dashboard displaying evaluation results.
- Visualizations (e.g., charts, graphs) comparing LLM performance across various tasks and metrics.

## Setup and Installation

### Prerequisites
- Node.js installed (for a Node.js-based frontend).
- Python installed (for the Flask backend).
- API keys for OpenAI GPT, Anthropic Claude, and LLaMA (or alternative).

### Clone the Repository
```bash
git clone https://github.com/lionggele/Chatbox_LLM_web.git
cd Chatbox_LLM_web
```

### Install Dependencies

#### Frontend Setup
1. Navigate to the `src` directory:
   ```bash
   cd src
   ```

2. Install the necessary frontend dependencies:
   ```bash
   npm install
   ```

#### Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```

2. Set up a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

### API Key Setup
Ensure that you have your API keys ready. Create a `.env` file in the root directory to securely store your API keys:
```
OPENAI_API_KEY=your_openai_api_key
CLAUDE_API_KEY=your_claude_api_key
LLAMA_API_KEY=your_llama_api_key
```

### Running the Application

#### Frontend
To start the frontend:
```bash
npm start
```

#### Backend
To start the backend:
```bash
python app.py
```

### Access the Application
Once both servers are running, access the web platform via:
```
http://localhost:3000
```

## Resources

Below are helpful resources for datasets and API integrations:

- **GLUE Benchmark**: [GLUE Benchmark](https://gluebenchmark.com/)
- **SuperGLUE Benchmark**: [SuperGLUE](https://super.gluebenchmark.com/)
- **SQuAD**: [SQuAD Explorer](https://rajpurkar.github.io/SQuAD-explorer/)
- **TruthfulQA**: [TruthfulQA GitHub](https://github.com/sylinrl/TruthfulQA)
- **MMLU**: [MMLU GitHub](https://github.com/hendrycks/test)
- **OpenAI GPT API Documentation**: [OpenAI Docs](https://platform.openai.com/docs/)
- **Anthropic Claude API Documentation**: Check Anthropic’s website for the latest.
- **Meta's LLaMA API**: Check Meta's AI research page for the latest.

## Project Structure

```plaintext
Chatbox_LLM_web/
│
├── public/              # Public assets for the web application
├── src/                 # Frontend source code
│   ├── assets/          # Images and other assets
│   ├── Data/           # Data fetching and API calls
│   ├── Domain/         # Domain models and business logic
│   ├── Presentation/    # Presentation layer
│   ├── Routes/         # Routing components
│   ├── App.js          # Main App component
│   ├── index.js        # Entry point for React
│   └── styles.css      # CSS for styling the app
│
├── server/              # Backend source code (if applicable)
│   └── app.py          # Flask server file
│
├── .env                 # Environment variables (not committed)
├── package.json         # Project configuration and dependencies
└── README.md            # Project documentation
```
