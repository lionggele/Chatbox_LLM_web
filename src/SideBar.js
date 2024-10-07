import React from 'react';
import { Link } from 'react-router-dom'; // To create navigation links

function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <Link to="/">LLM Response</Link> {/* Link to ChatBox */}
      </div>
      <div className="sidebar-item">
        <Link to="/comparison">Comparison</Link> {/* Link to Comparison Page */}
      </div>
      <div className="sidebar-item">
        <Link to="/performance">Performance Dashboard</Link> {/* Link to Performance Panel */}
      </div>
    </div>
  );
}

export default SideBar;
