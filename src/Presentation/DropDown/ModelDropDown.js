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

import React, { useState } from 'react';
import checkMarkIcon from '../../assets/selected_icon.png';
import { modelOptions, updateModelOnServerC } from '../../Domain/UseCases/handleModel';

const ModelDropdown = ({ selectedModel, setSelectedModel, dropdownOpen, setDropdownOpen, containerId }) => {
    const [error, setError] = useState(null);

    const handleModelSelect = async (modelName) => {
        console.log(`handleModelSelect called with: ${modelName} for container: ${containerId}`);
        try {
            await updateModelOnServerC(modelOptions[modelName], containerId);
            setSelectedModel(modelName);
            setDropdownOpen(false);
            setError(null);
            console.log('Model updated successfully:', modelName);
        } catch (error) {
            console.error('Error updating model:', error);
            setError(`Failed to update model: ${error.message}`);
        }
    };

    return (
        <div className="chatbox-header">
            <h3 className="dropdown-trigger" onClick={() => setDropdownOpen(!dropdownOpen)}>
                {selectedModel || 'Select Model'} ▼
            </h3>
            {error && <div className="error-message">{error}</div>}
            {dropdownOpen && (
                <div className="dropdown-options">
                    {/* ... rest of the dropdown code ... */}
                </div>
            )}
        </div>
    );
};

export default ModelDropdown;