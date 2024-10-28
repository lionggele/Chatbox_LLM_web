import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const StateProvider = ({ children }) => {
    const [messages, setMessages] = useState([
        { text: "Hi, I’m Sunflower, your ChatGPT assistant. How can I assist you?", sender: 'bot' }
    ]);

    return (
        <AppContext.Provider value={{ messages, setMessages }}>
            {children}
        </AppContext.Provider>
    );
};
