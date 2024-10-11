import React from 'react';
import checkMarkIcon from '../../assets/selected_icon.png';
import { modelOptions, updateModelOnServer } from '../../Domain/UseCases/handleModel';

const ModelDropdown = ({ selectedModel, setSelectedModel, dropdownOpen, setDropdownOpen }) => {
    const handleModelSelect = (modelName) => {
        setSelectedModel(modelName);
        setDropdownOpen(false);
        updateModelOnServer(modelOptions[modelName]);
    };

    return (
        <div className="chatbox-header">
            <h3 className="dropdown-trigger" onClick={() => setDropdownOpen(!dropdownOpen)}>
                {selectedModel} ▼
            </h3>
            {dropdownOpen && (
                <div className="dropdown-options">
                    <div className="dropdown-header">
                        <span>Select Model</span>
                    </div>
                    {Object.keys(modelOptions).map((displayName) => (
                        <div
                            key={displayName}
                            onClick={() => handleModelSelect(displayName)}
                            className={`dropdown-option ${selectedModel === displayName ? 'selected' : ''}`}
                        >
                            {displayName}
                            {selectedModel === displayName && (
                                <img src={checkMarkIcon} alt="Check" className="checkmark-icon" />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ModelDropdown;
