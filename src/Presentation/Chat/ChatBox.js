// ChatBox UI (can separate components)
// Reference: https://codepen.io/sajadhsm/pen/odaBdd

import React, { useState, useContext } from 'react';
import { ModelContext } from '../../Domain/Models/ModelContext';  // Import the context for model selection
import { handleSendMessage } from '../../Domain/UseCases/handleMessage';
import { modelOptions } from '../DropDown/ModelDropDown';
import checkMarkIcon from '../../assets/selected_icon.png';  // Path to your checkmark icon
import ChatInput from './ChatInput';
import MessageList from './MessageList';



function ChatBox() {
    const { selectedModel, setSelectedModel } = useContext(ModelContext);  // Access context state
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hi, I’m Sunflower, your ChatGPT assistant. How can I assist you?", sender: 'bot' }
    ]);
    const [loading, setLoading] = useState(false);

    // Handle message sending with the selected model
    const handleSend = (input) => {
        if (!selectedModel) {
            setMessages(prevMessages => [...prevMessages, { text: "Please select a model before sending a message.", sender: 'bot' }]);
            return;
        }
        handleSendMessage(input, setMessages, selectedModel, setLoading, messages);  // Pass the selected model
    };

    // Handle model selection
    const handleModelSelect = (modelName) => {
        setSelectedModel(modelName);  
        console.log("model:", modelName);
        setDropdownOpen(false);  // Close the dropdown after selection
    };

    return (
        <div className="chat-container">
            <div className="chatbox-header">
                <h3 className="dropdown-trigger" onClick={() => setDropdownOpen(!dropdownOpen)}>
                    {selectedModel || 'Select Model'} ▼
                </h3>
                {dropdownOpen && (
                    <div className="dropdown-options">
                        <div className="dropdown-header">
                            <span>Model</span>
                        </div>
                        {/* Dropdown for model selection */}
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

            <MessageList messages={messages}/>
            
            <ChatInput onSend={handleSend} />
        </div>
    );
}

export default ChatBox;
