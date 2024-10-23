import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SideBar from './Presentation/Common/Sidebar';
import AppRouter from './Routes/AppRouter';
import { ModelProvider } from './Domain/Models/ModelContext';
// import { AppProvider } from './Domain/Models/AppContext';
import './style/App.css';

function App() {
  return (
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
  );
}

export default App;