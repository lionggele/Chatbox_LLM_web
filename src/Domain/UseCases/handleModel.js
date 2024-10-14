// // Handle Model Selection with Dropdown controller This is just for OPEN AI
// // OPENAI model: https://platform.openai.com/docs/guides/fine-tuning
// // Google (Gemini) : https://ai.google.dev/gemini-api/docs/text-generation?lang=python

// export const modelOptions = {
//     "GPT-o1-preview": "o1-preview-2024-09-12",
//     "GPT-4o-2024-08-06": "gpt-4o-2024-08-06",
//     "GPT-4o-Mini-2024-07-18": "gpt-4o-mini-2024-07-18",
//     "GPT-4-0613": "gpt-4-0613",
//     "GPT-3.5-Turbo-0125": "gpt-3.5-turbo-0125",
//     "GPT-3.5-Turbo-1106": "gpt-3.5-turbo-1106",
//     "Gemini-1.5": "gemini-1.5-flash",
//     "Med-Palms": "med-palms",
//     "Additional model": "additional-model"
// };

// // Send the selected model to the Flask API
// export const updateModelOnServer = async (modelValue) => {
//     try {
//         console.log('Attempting to update model on server for model:', modelValue);
//         const response = await fetch('http://localhost:5000/set-model', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ model: modelValue })
//         });

//         if (!response.ok) {
//             throw new Error("Error setting model on server");
//         }

//         const result = await response.json();
//         console.log('Server response:', result);
//         console.log("Model set successfully:", modelValue);
//         return result;

//     } catch (error) {
//         console.error("Error setting model:", error);
//         throw error;
//     }
// };

// // Send the selected model to the Flask API
// export const updateModelOnServerC = async (modelValue, container) => {
//     try {
//         console.log(`Attempting to update model for ${container} with value:`, modelValue);
//         const response = await fetch(`http://localhost:5000/set-model?container=${container}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ model: modelValue })
//         });

//         if (!response.ok) {
//             throw new Error("Error setting model on server");
//         }
//         console.log(`Model set successfully for ${container}:`, modelValue);
//     } catch (error) {
//         console.error("Error setting model:", error);
//     }
// };

// // Function to handle model selection and update server
// export const handleModelSelect = async (displayName, setSelectedModel, setDropdownOpen) => {
//     setSelectedModel(displayName);
//     setDropdownOpen(false);
//     await updateModelOnServer(modelOptions[displayName]);
// }; 

// export const handleModelSelectC = async (displayName, setSelectedModel, setDropdownOpen, containerID) => {
//     setSelectedModel(displayName);
//     console.log('Selected model:', displayName);
//     setDropdownOpen(false);
//     await updateModelOnServerC(modelOptions[displayName],containerID);
// };

// export const fetchResponseFromModel = async (model, input, container) => {
//     try {
//         const response = await fetch('http://localhost:5000/api/ask', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ query: input, model: model, container: container}) 
//         });
//         console.log("Selected Model fetch:", model);
//         console.log("Selected Model R:", response);
//         const data = await response.json();
//         return data.message || "Error generating response.";
//     } catch (error) {
//         console.error("Error fetching response from model:", error);
//         return "Error generating response.";
//     }
// };


