import React, { useState, useContext } from 'react';
import { ModelContext } from '../../Domain/Models/ModelContext';
import checkMarkIcon from '../../assets/selected_icon.png';

export const modelOptions = {
    openai: 'OpenAI GPT',
    googlevertex: 'Google Vertex AI',
    anthropic: 'Anthropic Claude',
    mistral : 'Mistral AI'
};


const ModelDropdown = ({ dropdownOpen, setDropdownOpen }) => {
    const { selectedModel, setSelectedModel } = useContext(ModelContext);  // Access context state
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






// import React, { useState } from 'react';
// import checkMarkIcon from '../../assets/selected_icon.png';
// import { modelOptions, updateModelOnServerC } from '../../Domain/UseCases/handleModel';

// const ModelDropdown = ({ selectedModel, setSelectedModel, dropdownOpen, setDropdownOpen, containerId }) => {
//     const [error, setError] = useState(null);

//     const handleModelSelect = async (modelName) => {
//         console.log(`handleModelSelect called with: ${modelName} for container: ${containerId}`);
//         try {
//             await updateModelOnServerC(modelOptions[modelName], containerId);
//             setSelectedModel(modelName);
//             setDropdownOpen(false);
//             setError(null);
//             console.log('Model updated successfully:', modelName);
//         } catch (error) {
//             console.error('Error updating model:', error);
//             setError(`Failed to update model: ${error.message}`);
//         }
//     };

//     return (
//         <div className="chatbox-header">
//             <h3 className="dropdown-trigger" onClick={() => setDropdownOpen(!dropdownOpen)}>
//                 {selectedModel || 'Select Model'} ▼
//             </h3>
//             {error && <div className="error-message">{error}</div>}
//             {dropdownOpen && (
//                 <div className="dropdown-options">
//                     {/* ... rest of the dropdown code ... */}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ModelDropdown;


