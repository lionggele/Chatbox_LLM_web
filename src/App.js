import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideBar from './Components/Sidebar'; // Sidebar component
import ChatBox from './Components/ChatBox'; // Chat container component
import ComparisonPage from './Components/ComparisonPage'; // Comparison container component
import PerformanceDashboard from './Components/PerformanceDashboard';
import './style/App.css'; // Link to your CSS file

function App() {
  return (
    <Router>
      <div className="app-container">
        <SideBar />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<ChatBox />} />
            <Route path="/comparison" element={<ComparisonPage />} />
            <Route path="/performance" element={<PerformanceDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;



