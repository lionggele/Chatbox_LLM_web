import React from 'react';
import logo from './asset/default_logo_icon.jpg';
import dashboardIcon from './asset/dashboard_icon.png';
import chatIcon from './asset/messenger_icon.png';
import analyticsIcon from './asset/result_icon.png';
import logoutIcon from './asset/logout_icon.png';

function SideBar() {
    return (
        <div className="sidebar">
            <div className="sidebar-item1">
                <img src={logo} alt="Logo" className="sidebar-logo" />
            </div>
            <div className="sidebar-item">
                <img src={dashboardIcon} alt="Dashboard" />
            </div>
            <div className="sidebar-item active">
                <img src={chatIcon} alt="Chat" />
            </div>
            <div className="sidebar-item">
                <img src={analyticsIcon} alt="Analytics" />
            </div>
            <div className="sidebar-item logout">
                <img src={logoutIcon} alt="Logout" />
            </div>
        </div>
    );
}


export default SideBar;
