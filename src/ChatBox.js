import React, { useState } from 'react';
import infoIcon from './asset/info_icon.png'; 
import checkMarkIcon from './asset/selected_icon.png'; 

function ChatBox() {
    const [messages, setMessages] = useState([{ text: "Hi, I’m Sunflower, your ChatGPT assistant. How can I assist you?" }]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);  // To toggle dropdown visibility
    const [selectedModel, setSelectedModel] = useState("GPT-4o");  // Default model

    const handleSendMessage = () => {
        if (input.trim()) {
            setMessages([...messages, { text: input }]);
            setInput("");
            setLoading(true);
            setTimeout(() => setLoading(false), 1500);
        }
    };

    const handleDropdownClick = () => {
        setDropdownOpen(!dropdownOpen);  // Toggle the dropdown menu
    };

    const handleModelSelect = (model) => {
        setSelectedModel(model);  // Update the selected model
        setDropdownOpen(false);   // Close the dropdown after selection
    };

    return (
        <div className="chatbox">
            <div className="chatbox-header">
                <h3 className="dropdown-trigger" onClick={handleDropdownClick}>{selectedModel} ▼</h3>
                {dropdownOpen && (
                    <div className="dropdown-options">
                        <div className="dropdown-header">
                            <span>Model</span>
                            <img src={infoIcon} alt="Info" className="info-icon" />
                        </div>
                        <div 
                            onClick={() => handleModelSelect("GPT-4o")} 
                            className={`dropdown-option ${selectedModel === "GPT-4o" ? 'selected' : ''}`}
                        >
                            GPT-4o
                            {selectedModel === "GPT-4o" && <img src={checkMarkIcon} alt="Check" className="checkmark-icon" />}
                        </div>
                        <div 
                            onClick={() => handleModelSelect("Llama")} 
                            className={`dropdown-option ${selectedModel === "Llama" ? 'selected' : ''}`}
                        >
                            Llama
                            {selectedModel === "Llama" && <img src={checkMarkIcon} alt="Check" className="checkmark-icon" />}
                        </div>
                        <div 
                            onClick={() => handleModelSelect("Claude")} 
                            className={`dropdown-option ${selectedModel === "Claude" ? 'selected' : ''}`}
                        >
                            Claude
                            {selectedModel === "Claude" && <img src={checkMarkIcon} alt="Check" className="checkmark-icon" />}
                        </div>
                    </div>
                )}
            </div>
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className="message">{msg.text}</div>
                ))}
                {loading && <div className="message loading">...</div>}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message here..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
}

export default ChatBox;
