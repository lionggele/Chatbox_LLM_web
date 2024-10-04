import React from 'react';
import ChatBox from './ChatBox';
import PerformancePanel from './PerformancePanel';
import SideBar from './SideBar';
import './App.css';  // Link to your CSS file

function App() {
  return (
    <div className="app-container">
      <div className="sidebar">
        < SideBar />
      </div>
      <div className="chat-container">
        <ChatBox />
      </div>
      <div className="performance-container">
        <PerformancePanel />
      </div>
    </div>
  );
}

export default App;
