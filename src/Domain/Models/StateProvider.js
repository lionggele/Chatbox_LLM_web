// Save different state of the context of different pages
import React, { createContext, useState, useContext } from 'react';

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [chatState, setChatState] = useState({});
  const [comparisonState, setComparisonState] = useState({});
  const [performanceState, setPerformanceState] = useState({});
  const [leaderboardState, setLeaderboardState] = useState({});

  return (
    <StateContext.Provider
      value={{
        chatState,
        setChatState,
        comparisonState,
        setComparisonState,
        performanceState,
        setPerformanceState,
        leaderboardState,
        setLeaderboardState,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useAppState = () => useContext(StateContext);
