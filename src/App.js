import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideBar from './SideBar'; 
import ChatBox from './ChatBox'; 
import ComparisonPage from './Container/ComparisonPage'; 
import PerformancePanel from './Container/PerformancePanel'; 
import { ProSidebarProvider } from "react-pro-sidebar";
import './App.css';
function App() {
  return (
    <Router>
      <div className="app-container">
        <SideBar />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<ChatBox />} /> {/* Default route for Chat */}
            <Route path="/comparison" element={<ComparisonPage />} /> {/* Route for Comparison */}
            <Route path="/performance" element={<PerformancePanel />} /> {/* Route for Performance Dashboard */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;