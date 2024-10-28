// Reference: https://blog.openreplay.com/simple-sidebars-with-react-pro-sidebar-and-material-ui/

import React from "react";
import { Sidebar, Menu, SubMenu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Link } from 'react-router-dom';
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import CompareArrowsRoundedIcon from "@mui/icons-material/CompareArrowsRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ScienceRoundedIcon from "@mui/icons-material/ScienceRounded";
<<<<<<< HEAD

function SideBar() {
    const { collapseSidebar } = useProSidebar(); 
=======
import LeaderboardRoundedIcon from "@mui/icons-material/LeaderboardRounded";

function SideBar() {
    const { collapseSidebar } = useProSidebar();
>>>>>>> 86289d3141b7eba0c4c8692b51298ec24ec2b13e

    return (
        <Sidebar className="side-container">
            <Menu className="side-item">
                <MenuItem
                    className="menu1"
                    icon={
                        <MenuRoundedIcon
                            onClick={() => {
                                collapseSidebar();
                            }}
                        />
                    }
                >
                    <h2>LLM ChatBox</h2>
                </MenuItem>

                <MenuItem icon={<ChatRoundedIcon />}>
                    <Link to="/">LLM Response</Link>
                </MenuItem>
                <MenuItem icon={<CompareArrowsRoundedIcon />}>
                    <Link to="/comparison">Comparison</Link>
                </MenuItem>
                <MenuItem icon={<DashboardRoundedIcon />}>
                    <Link to="/performance">Performance Dashboard</Link>
                </MenuItem>
<<<<<<< HEAD
=======
<<<<<<< HEAD
                <SubMenu label="Testing" icon={<ScienceRoundedIcon />}>
                    <MenuItem>Test 1</MenuItem>
                    <MenuItem>Test 2</MenuItem>
=======
                {/* Updated Testing SubMenu to include a link to the Leaderboard */}
>>>>>>> 0cd475becc7315f2a82cd0250bc6d48f55b2edf7
                <SubMenu label="Testing" icon={<ScienceRoundedIcon />}>
                    <MenuItem icon={<LeaderboardRoundedIcon />}>
                        <Link to="/leaderboard">Leaderboard</Link>
                    </MenuItem>
>>>>>>> 86289d3141b7eba0c4c8692b51298ec24ec2b13e
                </SubMenu>
            </Menu>
        </Sidebar>
    );
}

export default SideBar;
<<<<<<< HEAD
    
=======
>>>>>>> 86289d3141b7eba0c4c8692b51298ec24ec2b13e
