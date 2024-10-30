// ChatBox UI (can separate components)
// Reference: https://codepen.io/sajadhsm/pen/odaBdd

import React, { useState, useContext } from 'react';
import { ModelContext } from '../../Domain/Models/ModelContext'; 
import { handleSendMessage } from '../../Domain/UseCases/handleMessage';
import { modelOptions } from '../DropDown/ModelDropDown';
import checkMarkIcon from '../../assets/selected_icon.png'; 
import ChatInput from './ChatInput';
import MessageList from './MessageList';



function ChatBox() {
    const { selectedModel, setSelectedModel } = useContext(ModelContext);  
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hi, I’m Sunflower, your ChatGPT assistant. How can I assist you?", sender: 'bot' }
    ]);
    const [loading, setLoading] = useState(false);

    const handleSend = (input) => {
        if (!selectedModel) {
            setMessages(prevMessages => [...prevMessages, { text: "Please select a model before sending a message.", sender: 'bot' }]);
            return;
        }
        handleSendMessage(input, setMessages, selectedModel, setLoading, messages);
    };

    // Model selection
    const handleModelSelect = (modelName) => {
        setSelectedModel(modelName);  
        console.log("model:", modelName);
        setDropdownOpen(false);  
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
