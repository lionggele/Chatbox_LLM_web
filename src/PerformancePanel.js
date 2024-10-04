import React from 'react';

function PerformancePanel() {
  return (
    <div className="performance-panel">
      <div className="performance-header">
        <h3>Performance</h3>
        <div className="dropdown">▼</div>
      </div>
      <div className="metric-chart">
        <div className="metric">
          <p>Accuracy</p>
          <div className="progress-bar">
            <span className="filled" style={{ width: '70%' }}></span>
          </div>
          <p>0.7</p>
        </div>
        <div className="metric">
          <p>F1 Score</p>
          <div className="progress-bar">
            <span className="filled" style={{ width: '70%' }}></span>
          </div>
          <p>0.7</p>
        </div>
        {/* Add more metrics as needed */}
      </div>
    </div>
  );
}

export default PerformancePanel;
