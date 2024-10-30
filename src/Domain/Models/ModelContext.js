import React, { createContext, useState } from 'react';

// Create a Context for the model
export const ModelContext = createContext();

// Create a provider component
export const ModelProvider = ({ children }) => {
    const [selectedModel, setSelectedModel] = useState(null);

    return (
        <ModelContext.Provider value={{ selectedModel, setSelectedModel }}>
            {children}
        </ModelContext.Provider>
    );
};
