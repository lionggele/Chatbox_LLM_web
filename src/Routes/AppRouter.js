// Routes for connecting pages 
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ChatBox from '../Presentation/Chat/ChatBox';
import ComparisonPage from '../Presentation/Dashboard/ComparisonPage';
import PerformanceDashboard from '../Presentation/Dashboard/PerformanceDashboard';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<ChatBox />} />
            <Route path="/comparison" element={<ComparisonPage />} />
            <Route path="/performance" element={<PerformanceDashboard />} />
            
        </Routes>
    );
};

export default AppRouter;
