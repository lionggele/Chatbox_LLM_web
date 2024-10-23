// Routes for connecting pages 
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ChatBox from '../Presentation/Chat/ChatBox';
import ComparisonPage from '../Presentation/Dashboard/ComparisonPage';
import PerformanceDashboard from '../Presentation/Dashboard/PerformanceDashboard';
<<<<<<< HEAD

=======
import Leaderboard from '../Presentation/Leaderboard/Leaderboard';
>>>>>>> 86289d3141b7eba0c4c8692b51298ec24ec2b13e
const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<ChatBox />} />
            <Route path="/comparison" element={<ComparisonPage />} />
            <Route path="/performance" element={<PerformanceDashboard />} />
<<<<<<< HEAD
            
=======
            <Route path="/leaderboard" element={<Leaderboard />} />
>>>>>>> 86289d3141b7eba0c4c8692b51298ec24ec2b13e
        </Routes>
    );
};

export default AppRouter;
