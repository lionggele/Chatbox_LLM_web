// Handle Model Selection with Dropdown controller This is just for OPEN AI 
export const modelOptions = {
    "GPT-o1-preview": "o1-preview-2024-09-12",
    "GPT-4o-2024-08-06": "gpt-4o-2024-08-06",
    "GPT-4o-Mini-2024-07-18": "gpt-4o-mini-2024-07-18",
    "GPT-4-0613": "gpt-4-0613",
    "GPT-3.5-Turbo-0125": "gpt-3.5-turbo-0125",
    "GPT-3.5-Turbo-1106": "gpt-3.5-turbo-1106",
    "BARDS": " ",
    "Med-Palms": "",
    "Additional model": "",

};

// Send the selected model to the Flask API
export const updateModelOnServer = (modelValue) => {
    fetch('http://localhost:5000/set-model', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ model: modelValue })
    }).catch(error => console.error("Error setting model: ", error));
};

// Handle model selection
export const handleModelSelect = (displayName, setSelectedModel, setDropdownOpen) => {
    setSelectedModel(displayName);
    setDropdownOpen(false);
    updateModelOnServer(modelOptions[displayName]);
};
