// Message list 
import React from 'react';

function MessageList({ messages }) {
    return (
        <div className="msgs">
            {messages.map((msg, index) => (
                <div key={index} className={`msg ${msg.sender === 'bot' ? 'left-msg' : 'right-msg'}`}>
                    <div className="msg-bubble">
                        <div className="msg-info">
                            <div className="msg-info-name">{msg.sender === 'bot' ? 'BOT' : 'User'}</div>
                        </div>
                        <div className="msg-text">{msg.text}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MessageList;
