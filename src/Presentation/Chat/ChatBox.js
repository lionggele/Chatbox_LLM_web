// ChatBox UI ( can separate components)
// Reference: https://codepen.io/sajadhsm/pen/odaBdd
import React, { useState } from 'react';
import infoIcon from '../../assets/info_icon.png'; 
import checkMarkIcon from '../../assets/selected_icon.png'; 
import { handleSendMessage } from '../../Domain/UseCases/handleMessage'; 
import { handleDropdownClick, handleModelSelect } from '../../Domain/UseCases/handleModel'; 
function ChatBox() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedModel, setSelectedModel] = useState("GPT-4o");
    const [messages, setMessages] = useState([
        { text: "Hi, I’m Sunflower, your ChatGPT assistant. How can I assist you?", sender: 'bot' }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);


    return (
        <div className="chat-container">
            <div className="chatbox-header">
                <h3 className="dropdown-trigger" onClick={() => handleDropdownClick(setDropdownOpen, dropdownOpen)}>
                    {selectedModel} ▼
                </h3>
                {dropdownOpen && (
                    <div className="dropdown-options">
                        <div className="dropdown-header">
                            <span>Model</span>
                            <img src={infoIcon} alt="Info" className="info-icon" />
                        </div>
                        <div onClick={() => handleModelSelect("GPT-4o", setSelectedModel, setDropdownOpen)} className={`dropdown-option ${selectedModel === "GPT-4o" ? 'selected' : ''}`}>
                            GPT-4o
                            {selectedModel === "GPT-4o" && <img src={checkMarkIcon} alt="Check" className="checkmark-icon" />}
                        </div>
                        <div onClick={() => handleModelSelect("Llama", setSelectedModel, setDropdownOpen)} className={`dropdown-option ${selectedModel === "Llama" ? 'selected' : ''}`}>
                            Llama
                            {selectedModel === "Llama" && <img src={checkMarkIcon} alt="Check" className="checkmark-icon" />}
                        </div>
                        <div onClick={() => handleModelSelect("Claude", setSelectedModel, setDropdownOpen)} className={`dropdown-option ${selectedModel === "Claude" ? 'selected' : ''}`}>
                            Claude
                            {selectedModel === "Claude" && <img src={checkMarkIcon} alt="Check" className="checkmark-icon" />}
                        </div>
                    </div>
                )}
            </div>

            <div className="msgs">
                {messages.map((msg, index) => (
                    <div key={index} className={`msg ${msg.sender === 'bot' ? 'left-msg' : 'right-msg'}`}>
                        {/* <div className="msg-img" style={{ backgroundImage: 'url(https://image.flaticon.com/icons/svg/327/327779.svg)' }}></div>
                        this doesn't show in UI */}
                        <div className="msg-bubble">
                            <div className="msg-info">
                                <div className="msg-info-name">{msg.sender === 'bot' ? 'BOT' : 'User'}</div>
                            </div>
                            <div className="msg-text">{msg.text}</div>
                        </div>
                    </div>
                ))}

                {/* {loading && <div className="msg loading">...</div>} {can use this in future} */}
            </div>

            <div className="chat-input">
                <input
                    rows="1"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message here..."
                    className="chat-textarea"
                />
                <button onClick={() => handleSendMessage(input, setMessages, setInput, setLoading, messages)} className="send-btn" >
                    Send
                </button>
            </div>
        </div>
    );
}

export default ChatBox;
