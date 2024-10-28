import React from 'react';
import '../../style/App.css';

function LoadingSpinner() {
  return (
    <div className="spinner-overlay">
      <div className="spinner"></div>
    </div>
  );
}

export default LoadingSpinner;
