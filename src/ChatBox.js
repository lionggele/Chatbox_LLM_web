import React, { useState } from 'react';
import infoIcon from './asset/info_icon.png';
import checkMarkIcon from './asset/selected_icon.png';

function ChatBox() {
    const [dropdownOpen, setDropdownOpen] = useState(false); 
    const [selectedModel, setSelectedModel] = useState("GPT-4o");  
    const [messages, setMessages] = useState([{ text: "Hi, I’m Sunflower, your ChatGPT assistant. How can I assist you?" }]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const handleDropdownClick = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleModelSelect = (model) => {
        setSelectedModel(model);  
        setDropdownOpen(false);  
    };

    const handleSendMessage = () => {
        if (input.trim()) {
            setMessages([...messages, { text: input }]);
            setInput("");
            setLoading(true);
            setTimeout(() => setLoading(false), 1500);
        }
    };

    return (
        <div className="chat-container">
            <div className="chatbox-header">
                <h3 className="dropdown-trigger" onClick={handleDropdownClick}>{selectedModel} ▼</h3>
                {dropdownOpen && (
                    <div className="dropdown-options">
                        <div className="dropdown-header">
                            <span>Model</span>
                            <img src={infoIcon} alt="Info" className="info-icon" />
                        </div>
                        <div onClick={() => handleModelSelect("GPT-4o")} className={`dropdown-option ${selectedModel === "GPT-4o" ? 'selected' : ''}`}>
                            GPT-4o
                            {selectedModel === "GPT-4o" && <img src={checkMarkIcon} alt="Check" className="checkmark-icon" />}
                        </div>
                    </div>
                )}
            </div>

            <div className="msgs">
                <div className="msg left-msg">
                    <div className="msg-img" style={{ backgroundImage: 'url(https://image.flaticon.com/icons/svg/327/327779.svg)' }}></div>
                    <div className="msg-bubble">
                        <div className="msg-info">
                            <div className="msg-info-name">BOT</div>
                            <div className="msg-info-time">12:45</div>
                        </div>
                        <div className="msg-text">Hi, welcome to SimpleChat! Go ahead and send me a message. 😄</div>
                    </div>
                </div>

                {messages.map((msg, index) => (
                    <div key={index} className="msg right-msg">
                        <div className="msg-img" style={{ backgroundImage: 'url(https://image.flaticon.com/icons/svg/327/327779.svg)' }}></div>
                        <div className="msg-bubble">
                            <div className="msg-info">
                                <div className="msg-info-name">User</div>
                                <div className="msg-info-time">{new Date().toLocaleTimeString()}</div>
                            </div>
                            <div className="msg-text">{msg.text}</div>
                        </div>
                    </div>
                ))}

                {loading && <div className="msg loading">...</div>}
            </div>

            <div className="chat-input">
                <input
                    rows="1"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message here..."
                    className="chat-textarea"
                ></input>
                <button onClick={handleSendMessage} className="send-btn">Send</button>
            </div>
        </div>
    );
}

export default ChatBox;
