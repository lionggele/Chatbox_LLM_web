// Dropdown bar for the model selecftion

import React, { useState, useContext } from 'react';
import { ModelContext } from '../../Domain/Models/ModelContext';
import checkMarkIcon from '../../assets/selected_icon.png';

export const modelOptions = {
    openai: 'OpenAI GPT',
    googlevertex: 'Google Vertex AI',
    anthropic: 'Anthropic Claude',
    mistral: 'Mistral AI'
};


const ModelDropdown = ({ dropdownOpen, setDropdownOpen }) => {
    const { selectedModel, setSelectedModel } = useContext(ModelContext);
    const [error, setError] = useState(null);

    const handleModelSelect = (modelName) => {
        setSelectedModel(modelName);
        setDropdownOpen(false);
    };

    return (
        <div className="dropdown-container">
            <button className="dropdown-trigger" onClick={() => setDropdownOpen(!dropdownOpen)}>
                {selectedModel || 'Select Model'} ▼
            </button>
            {error && <div className="error-message">{error}</div>}
            {dropdownOpen && (
                <ul className="dropdown-menu">
                    {Object.keys(modelOptions).map((model) => (
                        <li key={model} onClick={() => handleModelSelect(model)}>
                            {modelOptions[model]}
                            {selectedModel === model && <img src={checkMarkIcon} alt="Selected" />}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ModelDropdown;
