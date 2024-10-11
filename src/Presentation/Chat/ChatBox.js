// ChatBox UI (can separate components)
// Reference: https://codepen.io/sajadhsm/pen/odaBdd

import React, { useState } from 'react';
import { handleModelSelect, modelOptions } from '../../Domain/UseCases/handleModel';
import { handleSendMessage } from '../../Domain/UseCases/handleMessage';
import infoIcon from '../../assets/info_icon.png';
import checkMarkIcon from '../../assets/selected_icon.png';
import ChatInput from './ChatInput';
import MessageList from './MessageList';

function ChatBox() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedModel, setSelectedModel] = useState("Model");
    const [messages, setMessages] = useState([
        { text: "Hi, I’m Sunflower, your ChatGPT assistant. How can I assist you?", sender: 'bot' }
    ]);
    const [loading, setLoading] = useState(false);

    // Send user input to the Flask API
    const handleSend = (input) => {
        handleSendMessage(input, setMessages, () => { }, setLoading, messages);
    };

    return (
        <div className="chat-container">
            <div className="chatbox-header">
                <h3 className="dropdown-trigger" onClick={() => setDropdownOpen(!dropdownOpen)}>
                    {selectedModel} ▼
                </h3>
                {dropdownOpen && (
                    <div className="dropdown-options">
                        <div className="dropdown-header">
                            <span>Model</span>
                        </div>
                        {/* to produce clean code and list  */}
                        {Object.keys(modelOptions).map((displayName) => (
                            <div
                                key={displayName}
                                onClick={() => handleModelSelect(displayName, setSelectedModel, setDropdownOpen)}
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

            <MessageList messages={messages} />
            <ChatInput onSend={handleSend} />
        </div>
    );
}

export default ChatBox;
