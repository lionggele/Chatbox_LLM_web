// LoadingSpinner.js
import React from 'react';
import '../../style/App.css'; // Make sure to create this CSS file

function LoadingSpinner() {
  return (
    <div className="spinner-overlay">
      <div className="spinner"></div>
    </div>
  );
}

export default LoadingSpinner;
