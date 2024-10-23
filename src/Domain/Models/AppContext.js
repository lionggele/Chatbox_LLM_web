import { createContext, useState } from 'react';

// Create Context
export const AppContext = createContext();

// Create Provider component to wrap your app and provide state
export const AppProvider = ({ children }) => {
    const [chatData, setChatData] = useState([]);
    const [comparisonData, setComparisonData] = useState([]);
    const [performanceData, setPerformanceData] = useState([]);

    return (
        <AppContext.Provider
            value={{
                chatData,
                setChatData,
                comparisonData,
                setComparisonData,
                performanceData,
                setPerformanceData,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
