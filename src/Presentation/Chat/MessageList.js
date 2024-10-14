import React from 'react';
import ReactMarkdown from 'react-markdown';

function MessageList({ messages }) {
    return (
        <div className="msgs">
            {messages.map((msg, index) => (
                <div key={index} className={`msg ${msg.sender === 'bot' ? 'left-msg' : 'right-msg'}`}>
                    <div className="msg-bubble">
                        <div className="msg-info">
                            <div className="msg-info-name">{msg.sender === 'bot' ? 'BOT' : 'User'}</div>
                        </div>
                        <div className="msg-text">
                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MessageList;
