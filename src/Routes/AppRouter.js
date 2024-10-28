// Routes for connecting pages 
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ChatBox from '../Presentation/Chat/ChatBox';
import ComparisonPage from '../Presentation/Dashboard/ComparisonPage';
import PerformanceDashboard from '../Presentation/Dashboard/PerformanceDashboard';
import Leaderboard from '../Presentation/Leaderboard/Leaderboard';
import { StateProvider } from '../Domain/Models/StateProvider';
const AppRouter = () => {
    return (
        <StateProvider>
            <Routes>
                <Route path="/" element={<ChatBox />} />
                <Route path="/comparison" element={<ComparisonPage />} />
                <Route path="/performance" element={<PerformanceDashboard />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
        </StateProvider>
    );
};

export default AppRouter;
