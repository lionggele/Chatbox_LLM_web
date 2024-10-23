"use client";

import React, { useState, useContext, useEffect } from 'react';
import { ModelContext } from '../../Domain/Models/ModelContext';
import { modelOptions } from '../DropDown/ModelDropDown';
import checkMarkIcon from '../../assets/selected_icon.png';
import { PerformanceBarChart } from './PerformanceChart';

// Split experiment ID into components
function parseExperimentId(experimentId) {
  const [dataset, samplingSize, model, date] = experimentId.split('_');
  return {
    dataset,
    samplingSize,
    model,
    date,
  };
}

function PerformanceDashboard() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { selectedModel, setSelectedModel } = useContext(ModelContext);
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [selectedSampling, setSelectedSampling] = useState(null);
  const [evaluationResults, setEvaluationResults] = useState([]);
  const [experimentOptions, setExperimentOptions] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [rows, setRows] = useState([{ prediction: '', reference: '' }]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedExperiment, setSelectedExperiment] = useState(null);
  const [selectedExperimentModel, setSelectedExperimentModel] = useState('');
  const [selectedExperimentDataset, setSelectedExperimentDataset] = useState('');
  const [selectedExperimentSampling, setSelectedExperimentSampling] = useState('');
  const [viewAllWithSameId, setViewAllWithSameId] = useState(false);
  const [newEvaluatedResults, setNewEvaluatedResults] = useState([]); // State to store newly evaluated results

  // Fetch saved evaluation results when the component loads
  useEffect(() => {
    const fetchEvaluationResults = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/get_evaluation_results');
        if (response.ok) {
          const result = await response.json();
          const parsedResults = result.map((item) => ({
            ...item,
            ...parseExperimentId(item.experiment_id),
          }));
          setEvaluationResults(parsedResults);
        } else {
          console.error('Failed to fetch evaluation results');
        }
      } catch (error) {
        console.error('Error fetching evaluation results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluationResults();
  }, []);

  // Update experiment options based on selected filters
  useEffect(() => {
    if (selectedExperimentDataset && selectedExperimentModel && selectedExperimentSampling) {
      const filteredExperiments = evaluationResults.filter(
        (experiment) =>
          experiment.dataset === selectedExperimentDataset &&
          experiment.model === selectedExperimentModel &&
          experiment.samplingSize === selectedExperimentSampling.toString()
      );
      setExperimentOptions(filteredExperiments);
    } else {
      setExperimentOptions([]);
    }
  }, [selectedExperimentDataset, selectedExperimentModel, selectedExperimentSampling, evaluationResults]);

  // Model Selection
  const handleModelSelect = (modelName) => {
    setSelectedModel(modelName);
    setDropdownOpen(false);
  };

  // Dataset Selection
  const handleDatasetSelect = (datasetName) => {
    setSelectedDataset(datasetName);
  };

  // Sampling Selection
  const handleSamplingSelect = (samplingSize) => {
    setSelectedSampling(samplingSize);
  };

  // Experiment Selection
  const handleExperimentSelect = (experimentId) => {
    setViewAllWithSameId(false);
    const selected = evaluationResults.find((exp) => exp.experiment_id === experimentId);
    setSelectedExperiment(selected);
  };

  // View all with the same experiment ID
  const handleViewAllWithSameId = (experimentId) => {
    setViewAllWithSameId(true);
    const selected = evaluationResults.filter((exp) => exp.experiment_id === experimentId);
    setSelectedExperiment(selected);
  };

  // Submit the selected model, dataset, and sampling size
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/process_dataset', {
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
        if (result && Array.isArray(result.evaluation_results)) {
          setNewEvaluatedResults(result.evaluation_results); // Save the new evaluation results
          setEvaluationResults([...evaluationResults, ...result.evaluation_results]); // Update the overall evaluation results
        } else {
          console.error("Invalid response format. Expected an array for evaluation_results.");
          setEvaluationResults([]);
        }
      } else {
        console.error('Failed to process dataset');
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

  // Prepare data for the charts
  const prepareChartData = (experimentData) => {
    if (!experimentData || (Array.isArray(experimentData) && experimentData.length === 0)) {
      return [];
    }
    return Array.isArray(experimentData) ? experimentData : [experimentData];
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
        <span><h3 className="title-performanceboard">Random Sampling (Number of Rows):</h3></span>
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
      <div className="submit-container">
        <button className="submit-button" onClick={handleSubmit} disabled={loading || !selectedDataset || !selectedSampling}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>

      {/* New Evaluated Results Display */}
      {/* <div className={`dataset-card ${isExpanded ? 'expanded' : ''}`}> */}
        <div className="new-evaluated-results-container">
          <h3 className="title-performanceboard">Newly Evaluated Results</h3>
          <table className="new-evaluated-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Experiment ID</th>
                <th>Context</th>
                <th>Question</th>
                <th>Answer</th>
                <th>LLM Response</th>
                <th>F1 Score</th>
                <th>BLEU Score</th>
              </tr>
            </thead>
            <tbody>
              {newEvaluatedResults.length > 0 ? (
                newEvaluatedResults.map((experiment) => (
                  <tr key={experiment.id}>
                    <td>{experiment.id}</td>
                    <td>{experiment.experiment_id || 'N/A'}</td>
                    <td>{experiment.context || 'N/A'}</td>
                    <td>{experiment.question || 'N/A'}</td>
                    <td>{experiment.correct_answer || 'N/A'}</td>
                    <td>{experiment.llm_response || 'N/A'}</td>
                    <td>{experiment.f1_score != null ? Number(experiment.f1_score).toFixed(5) : 'N/A'}</td>
                    <td>{experiment.bleu_score != null ? Number(experiment.bleu_score).toFixed(5) : 'N/A'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No new evaluation available yet.</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className='chart-container'>
            <PerformanceBarChart data={prepareChartData(newEvaluatedResults)} />
          </div>
        </div>
      {/* </div> */}

      {/* Generated Performance Dataset and Experiment Selection */}
      <div className={`dataset-card ${isExpanded ? 'expanded' : ''}`}>
        <div className="dataset-title-container">
          <h3 className="title-performanceboard">Generated Performance Dataset</h3>
          <div className="experiment-filters" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <h3 className="title-performanceboard">Experiment Filters:</h3>
            <div>
              <label>Model: </label>
              <select
                value={selectedExperimentModel}
                onChange={(e) => setSelectedExperimentModel(e.target.value)}
              >
                <option value="">Select Model</option>
                {Object.keys(modelOptions).map((model) => (
                  <option key={model} value={model}>
                    {modelOptions[model]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Dataset: </label>
              <select
                value={selectedExperimentDataset}
                onChange={(e) => setSelectedExperimentDataset(e.target.value)}
              >
                <option value="">Select Dataset</option>
                {['SQuAD', 'Truthful'].map((dataset) => (
                  <option key={dataset} value={dataset}>
                    {dataset}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Sampling Size: </label>
              <select
                value={selectedExperimentSampling}
                onChange={(e) => setSelectedExperimentSampling(e.target.value)}
              >
                <option value="">Select Sampling Size</option>
                {[10, 20, 50, 100].map((sample) => (
                  <option key={sample} value={sample}>
                    {sample}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="experiment-selection">
            <h3 className="title-performanceboard">Select Experiment:</h3>
            <select
              value={selectedExperiment ? selectedExperiment.experiment_id : ''}
              onChange={(e) => handleExperimentSelect(e.target.value)}
            >
              <option value="">Select an experiment</option>
              {experimentOptions.map((experiment) => (
                <option key={experiment.experiment_id} value={experiment.experiment_id}>
                  {experiment.experiment_id}
                </option>
              ))}
            </select>
          </div>
          <button
            className="view-all-button"
            onClick={() => handleViewAllWithSameId(selectedExperiment?.experiment_id)}
            disabled={!selectedExperiment}
          >
            View All with Same Experiment ID
          </button>
        </div>
        <div className="dataset-table-wrapper">
          <table className="dataset-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Experiment ID</th>
                <th>Context</th>
                <th>Question</th>
                <th>Answer</th>
                <th>LLM Response</th>
                <th>F1 Score</th>
                <th>BLEU Score</th>
              </tr>
            </thead>
            <tbody>
              {viewAllWithSameId && selectedExperiment && Array.isArray(selectedExperiment) ? (
                selectedExperiment.map((experiment) => (
                  <tr key={experiment.id}>
                    <td>{experiment.id}</td>
                    <td>{experiment.experiment_id || 'N/A'}</td>
                    <td>{experiment.context || 'N/A'}</td>
                    <td>{experiment.question || 'N/A'}</td>
                    <td>{experiment.correct_answer || 'N/A'}</td>
                    <td>{experiment.llm_response || 'N/A'}</td>
                    <td>{experiment.f1_score != null ? Number(experiment.f1_score).toFixed(5) : 'N/A'}</td>
                    <td>{experiment.bleu_score != null ? Number(experiment.bleu_score).toFixed(5) : 'N/A'}</td>
                  </tr>
                ))
              ) : selectedExperiment ? (
                <tr key={selectedExperiment.id}>
                  <td>{selectedExperiment.id}</td>
                  <td>{selectedExperiment.experiment_id || 'N/A'}</td>
                  <td>{selectedExperiment.context || 'N/A'}</td>
                  <td>{selectedExperiment.question || 'N/A'}</td>
                  <td>{selectedExperiment.correct_answer || 'N/A'}</td>
                  <td>{selectedExperiment.llm_response || 'N/A'}</td>
                  <td>{selectedExperiment.f1_score != null ? Number(selectedExperiment.f1_score).toFixed(5) : 'N/A'}</td>
                  <td>{selectedExperiment.bleu_score != null ? Number(selectedExperiment.bleu_score).toFixed(5) : 'N/A'}</td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="8">No response available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <button onClick={toggleExpand} className="toggle-button">
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
        <div className='chart-container'>
          <PerformanceBarChart
            data={prepareChartData(
              viewAllWithSameId && selectedExperiment && Array.isArray(selectedExperiment)
                ? selectedExperiment
                : [selectedExperiment, ...newEvaluatedResults].filter(Boolean)
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default PerformanceDashboard;
