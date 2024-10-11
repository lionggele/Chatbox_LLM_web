import React, { useState } from 'react';
import MessageList from '../Chat/MessageList';
import ChatInput from '../Chat/ChatInput';
import { modelOptions, handleModelSelectC, fetchResponseFromModel, fetchResponseFromModel2, handleModelSelect, } from '../../Domain/UseCases/handleModel';
import checkMarkIcon from '../../assets/selected_icon.png';

function ComparisonPage() {
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [selectedModel1, setSelectedModel1] = useState("Select Your Model"); //GPT-o1-preview
  const [selectedModel2, setSelectedModel2] = useState("Select Your Model");
  const [messagesModel1, setMessagesModel1] = useState([]);
  const [messagesModel2, setMessagesModel2] = useState([]);
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    { text: "Hi, I’m Sunflower, your ChatGPT assistant. How can I assist you?", sender: 'bot' }
  ]);

  // logic to try separate the differnt selected model
  const handleModelSelectContainer1 = async (displayName, setSelectedModel, setDropdownOpen) => {
    setSelectedModel1(displayName);
    setDropdownOpen1(false);
    await updateModelOnServer2(displayName, "container1");
  };

  const handleModelSelectContainer2 = async (displayName, setSelectedModel, setDropdownOpen) => {
    setSelectedModel2(displayName);
    setDropdownOpen2(false);
    await updateModelOnServer2(displayName, "container2");
  };


  const handleSend = async (input) => {
    const newMessage = { text: input, sender: 'user' };

    setMessagesModel1((prev) => [...prev, newMessage]);
    setMessagesModel2((prev) => [...prev, newMessage]);

    setLoading(true);

    try {
      // Send the user query to the selected models
      const response1 = await fetchResponseFromModel2(selectedModel1, input, "container1");
      const response2 = await fetchResponseFromModel2(selectedModel2, input, "container2");
      console.log("Selected R1", response1);
      console.log("Selected R2", response2);
      // Add the bot response to each chat container
      setMessagesModel1((prev) => [...prev, { text: response1, sender: 'bot' }]);
      setMessagesModel2((prev) => [...prev, { text: response2, sender: 'bot' }]);
    } catch (error) {
      console.error("Error fetching model responses:", error);
    }

    setLoading(false);
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
                  <span>Select Model</span>
                </div>
                {Object.keys(modelOptions).map((displayName) => (
                  <div
                    key={displayName}
                    onClick={() => handleModelSelectC(displayName, setSelectedModel1, setDropdownOpen1)}
                    className={`dropdown-option ${selectedModel1 === displayName ? 'selected' : ''}`}
                  >
                    {displayName}
                    {selectedModel1 === displayName && (
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
                  <span>Select Model</span>
                </div>
                {Object.keys(modelOptions).map((displayName) => (
                  <div
                    key={displayName}
                    onClick={() => handleModelSelectC(displayName, setSelectedModel2, setDropdownOpen2)}
                    className={`dropdown-option ${selectedModel2 === displayName ? 'selected' : ''}`}
                  >
                    {displayName}
                    {selectedModel2 === displayName && (
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

      {/* Shared Input for Both Chat Boxes */}
      <ChatInput onSend={handleSend} loading={loading} />
    </div>
  );
}

// Send the selected model to the Flask API
export const updateModelOnServer2 = async (modelValue, container) => {
  try {
    const response = await fetch(`http://localhost:5000/set-model?container=${container}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ model: modelValue })
    });

    if (!response.ok) {
      throw new Error("Error setting model on server");
    }
    console.log(`Model set successfully for ${container}:`, modelValue);
  } catch (error) {
    console.error("Error setting model:", error);
  }
};

export default ComparisonPage;
