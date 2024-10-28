// Dropdown bar for the model selecftion

import React, { useState, useContext } from 'react';
import { ModelContext } from '../../Domain/Models/ModelContext';
import checkMarkIcon from '../../assets/selected_icon.png';

export const modelOptions = {
<<<<<<< HEAD
    openai: 'OpenAI GPT',
    googlevertex: 'Google Vertex AI',
    anthropic: 'Anthropic Claude',
    mistral : 'Mistral AI'
=======
    openai: 'GPT 4o Mini',
    googlevertex: 'Gemini-1.5-Flash',
    mistral: 'Mistral AI small latest',
    anthropic: 'Anthropic Claude (unpaid)',
>>>>>>> 86289d3141b7eba0c4c8692b51298ec24ec2b13e
};


const ModelDropdown = ({ dropdownOpen, setDropdownOpen }) => {
    const { selectedModel, setSelectedModel } = useContext(ModelContext);
    const [error, setError] = useState(null);

    const handleModelSelect = (modelName) => {
<<<<<<< HEAD
        setSelectedModel(modelName);  
=======
        setSelectedModel(modelName);
>>>>>>> 86289d3141b7eba0c4c8692b51298ec24ec2b13e
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
