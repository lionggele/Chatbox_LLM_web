import React, { useState } from 'react';
import MessageList from '../Chat/MessageList';
import ChatInput from '../Chat/ChatInput';
import { modelOptions } from '../DropDown/ModelDropDown';
import checkMarkIcon from '../../assets/selected_icon.png';
import { handleSendMessage } from '../../Domain/UseCases/handleMessage';

function ComparisonPage() {
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [selectedModel1, setSelectedModel1] = useState('Select Your Model');
  const [selectedModel2, setSelectedModel2] = useState('Select Your Model');
  const [messagesModel1, setMessagesModel1] = useState([
    { text: "Hi, I’m Sunflower, your assistant for Model 1.", sender: 'bot' }
  ]);
  const [messagesModel2, setMessagesModel2] = useState([
    { text: "Hi, I’m Sunflower, your assistant for Model 2.", sender: 'bot' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleModelSelect = (modelName, setSelectedModel, setDropdownOpen) => {
    setSelectedModel(modelName);
    console.log(" model:", modelName);
    setDropdownOpen(false);
  };

  // Handle message sending with both selected models
  const handleSend = (input) => {
    if (!selectedModel1 || !selectedModel2) {
      console.error("Please select models for both chat containers.");
      return;
    }

    setLoading(true);

    // Send the same input to both models
    Promise.all([
      handleSendMessage(input, setMessagesModel1, selectedModel1, setLoading, messagesModel1),
      handleSendMessage(input, setMessagesModel2, selectedModel2, setLoading, messagesModel2)
    ])
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Error sending messages to models:", error);
        setLoading(false);
      });
  };


  return (
    <div className="comparison-page">
      <div className="comparison-container">
        {/* First Chat Box */}
        <div className="chat-side-container">
          <div className="chatbox-header">
            <h3 className="dropdown-trigger" onClick={() => setDropdownOpen1(!dropdownOpen1)}>
              {selectedModel1} ▼
            </h3>
            {dropdownOpen1 && (
              <div className="dropdown-options">
                <div className="dropdown-header">
                  <span>Model</span>
                </div>
                {Object.keys(modelOptions).map((model) => (
                  <div
                    key={model}
                    onClick={() => handleModelSelect(model, setSelectedModel1, setDropdownOpen1)}
                    className={`dropdown-option ${selectedModel1 === model ? 'selected' : ''}`}
                  >
                    {modelOptions[model]}
                    {selectedModel1 === model && (
                      <img src={checkMarkIcon} alt="Check" className="checkmark-icon" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <MessageList messages={messagesModel1} />
        </div>

        {/* Second Chat Box */}
        <div className="chat-side-container">
          <div className="chatbox-header">
            <h3 className="dropdown-trigger" onClick={() => setDropdownOpen2(!dropdownOpen2)}>
              {selectedModel2} ▼
            </h3>
            {dropdownOpen2 && (
              <div className="dropdown-options">
                <div className="dropdown-header">
                  <span>Model</span>
                </div>
                {Object.keys(modelOptions).map((model) => (
                  <div
                    key={model}
                    onClick={() => handleModelSelect(model, setSelectedModel2, setDropdownOpen2)}
                    className={`dropdown-option ${selectedModel2 === model ? 'selected' : ''}`}
                  >
                    {modelOptions[model]}
                    {selectedModel2 === model && (
                      <img src={checkMarkIcon} alt="Check" className="checkmark-icon" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <MessageList messages={messagesModel2} />
        </div>
      </div>
      <ChatInput onSend={handleSend} loading={loading} />
    </div>
  );
}

export default ComparisonPage;
