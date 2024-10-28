import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SideBar from './Presentation/Common/Sidebar';
import AppRouter from './Routes/AppRouter';
import { ModelProvider } from './Domain/Models/ModelContext';
<<<<<<< HEAD
=======
// import { AppProvider } from './Domain/Models/AppContext';
import './style/App.css';
>>>>>>> 86289d3141b7eba0c4c8692b51298ec24ec2b13e

import './style/App.css';
function App() {
  return (
<<<<<<< HEAD
    <ModelProvider>
      <Router>
        <div className="app-container">
          <SideBar />
          <div className="content-container">
            <AppRouter />
          </div>
        </div>
      </Router>
    </ModelProvider>
=======
      <ModelProvider>
        <Router>
          <div className="app-container">
            <SideBar />
            <div className="content-container">
              <AppRouter />
            </div>
          </div>
        </Router>
      </ModelProvider>
>>>>>>> 86289d3141b7eba0c4c8692b51298ec24ec2b13e
  );
}

export default App;