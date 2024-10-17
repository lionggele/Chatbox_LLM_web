// Reference: https://huggingface.co/spaces/evaluate-metric/exact_match

import React, { useState, useContext } from 'react';
import { ModelContext } from '../../Domain/Models/ModelContext';
import { modelOptions } from '../DropDown/ModelDropDown';
import checkMarkIcon from '../../assets/selected_icon.png';
import { PerformanceBarChart } from './PerformanceChart';
import LoadingSpinner from '../../Domain/Models/LoadingSpinner';

function PerformanceDashboard() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { selectedModel, setSelectedModel } = useContext(ModelContext);
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [selectedSampling, setSelectedSampling] = useState(null);
  const [evaluationResults, setEvaluationResults] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [rows, setRows] = useState([{ prediction: '', reference: '' }]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Model Selection
  const handleModelSelect = (modelName) => {
    setSelectedModel(modelName);
    console.log("Selected model:", modelName);
    setDropdownOpen(false);
  };

  // Dataset Selection
  const handleDatasetSelect = (datasetName) => {
    setSelectedDataset(datasetName);
    console.log("Selected dataset:", datasetName);
  };

  // Sampling Selection
  const handleSamplingSelect = (samplingSize) => {
    setSelectedSampling(samplingSize);
    console.log("Selected sampling size:", samplingSize);
  };

  // Submit the selected model, dataset, and sampling size
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/process_dataset', {  // Change the URL here
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedModel,
          selectedDataset,
          selectedSampling,
        }),
      });
      if (response.ok) {
        const result = await response.json();
        setMessage('Dataset processed successfully!');
        console.log("Selected Model:", selectedModel);
        console.log("Selected Dataset:", selectedDataset);
        console.log("Selected Sampling:", selectedSampling);
        console.log("Response:", result);
        console.log('evaluation_results:', result.evaluation_results);
        // Check if evaluation_results is an array
        if (result && result.evaluation_results && Array.isArray(result.evaluation_results.evaluation_results)) {
          setEvaluationResults(result.evaluation_results.evaluation_results);
        } else {
          console.error("Invalid response format. Expected an array for evaluation_results.");
          setEvaluationResults([]);
        }
      } else {
        console.log('Failed to process dataset');
        setMessage('Failed to process dataset');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred');
    } finally {
      setLoading(false);
    }
  };


  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAddRow = () => {
    setRows([...rows, { prediction: '', reference: '' }]);
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleClear = () => {
    setRows([{ prediction: '', reference: '' }]);
    setMessage('');
  };

  const prepareChartData = (results) => {
    return results.map((result, index) => ({
      label: `Sample ${index + 1}`,
      f1_score: result.f1_score || 0,
      bleu_score: result.bleu_score || 0,
    }));
  };

  return (
    <div className="performance-container">
      {/* Model Selection and Dataset Configuration UI */}
      <div className="model-selection">
        <h3 className="dropdown-trigger" onClick={() => setDropdownOpen(!dropdownOpen)}>
          {selectedModel || 'Select Model'} ▼
        </h3>
        {dropdownOpen && (
          <div className="dropdown-options">
            <div className="dropdown-header">
              <span>Model</span>
            </div>
            {Object.keys(modelOptions).map((model) => (
              <div
                key={model}
                onClick={() => handleModelSelect(model)}
                className={`dropdown-option ${selectedModel === model ? 'selected' : ''}`}
              >
                {modelOptions[model]}
                {selectedModel === model && (
                  <img src={checkMarkIcon} alt="Check" className="checkmark-icon" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Dataset and Sampling Selection */}
      <div className="button-group-container">
        <span><h3 className="title-performanceboard">Dataset:</h3></span>
        <div className="dataset-button-group">
          {['SQuAD', 'Truthful'].map((dataset) => (
            <button
              key={dataset}
              className={`dataset-button ${selectedDataset === dataset ? 'selected' : ''}`}
              onClick={() => handleDatasetSelect(dataset)}
            >
              {dataset}
            </button>
          ))}
        </div>
      </div>
      <div className="button-group-container">
        <span><h3 className="title-performanceboard">Random Sampling:</h3></span>
        <div className="sampling-button-group">
          {[10, 20, 50, 100].map((sample) => (
            <button
              key={sample}
              className={`sampling-button ${selectedSampling === sample ? 'selected' : ''}`}
              onClick={() => handleSamplingSelect(sample)}
            >
              {sample}
            </button>
          ))}
        </div>
      </div>
      <div className="container-with-input">
        <div className="data-input">
          <h3 className="title-performanceboard">Data Input</h3>
          <table>
            <thead>
              <tr>
                <th>Predictions</th>
                <th>References</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={row.prediction}
                      onChange={(e) => handleRowChange(index, 'prediction', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.reference}
                      onChange={(e) => handleRowChange(index, 'reference', e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="buttons">
            <button className="data-input-btn" onClick={handleAddRow}>New row</button>
            <button className="data-input-btn" onClick={handleClear}>Clear</button>
          </div>
          {message && (
            <div className="message-container">
              <div className={`message ${message === 'Form submitted successfully!' ? 'success' : 'error'}`}>
                {message}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="submit-container">
        <button className="submit-button" onClick={handleSubmit} disabled={loading || !selectedDataset || !selectedSampling}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
      {/* Dataset Card (Should appear first in the layout) */}
      <div className={`dataset-card ${isExpanded ? 'expanded' : ''}`}>
        <div className="dataset-title-container">
          <h3 className="title-performanceboard">Generated Performance Dataset</h3>
        </div>
        <div className="dataset-table-wrapper">
          <table className="dataset-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Context</th>
                <th>Question</th>
                <th>Answer</th>
                <th>LLM Response</th>
                <th>F1 Score</th>
                <th>BLEU Score</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(evaluationResults) && evaluationResults.length > 0 ? (
                evaluationResults.map((result) => (
                  <tr key={result.id}>
                    <td>{result.id}</td>
                    <td>{result.title || 'N/A'}</td>
                    <td>{result.context || 'N/A'}</td>
                    <td>{result.question || 'N/A'}</td>
                    <td>{result.correct_answer || 'N/A'}</td>
                    <td>{result.llm_response || 'N/A'}</td>
                    <td>{result.f1_score != null ? result.f1_score : 'N/A'}</td>
                    <td>{result.bleu_score != null ? result.bleu_score : 'N/A'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <button onClick={toggleExpand} className="toggle-button">
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
        <div className='chart-container'>
          <PerformanceBarChart data={evaluationResults} />
        </div>
      </div>
    </div>
  );
}

export default PerformanceDashboard;
