// src/Presentation/Chat/ChatInput.js
import React, { useState } from 'react';

function  ChatInput({ onSend }) {
    const [input, setInput] = useState("");

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            onSend(input); 
            setInput(""); 
        }
    };

    return (
        <div className="chat-input">
            <input
                rows="1"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="chat-textarea"
            />
            <button onClick={() => { onSend(input); setInput(""); }} className="send-btn">
                Send
            </button>
        </div>
    );
}

export default ChatInput;
