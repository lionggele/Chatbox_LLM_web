// Reference: https://blog.openreplay.com/simple-sidebars-with-react-pro-sidebar-and-material-ui/

import React from "react";
import { Sidebar, Menu, SubMenu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Link } from 'react-router-dom';
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import CompareArrowsRoundedIcon from "@mui/icons-material/CompareArrowsRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ScienceRoundedIcon from "@mui/icons-material/ScienceRounded";

function SideBar() {
    const { collapseSidebar } = useProSidebar(); 

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
                <SubMenu label="Testing" icon={<ScienceRoundedIcon />}>
                    <MenuItem>Test 1</MenuItem>
                    <MenuItem>Test 2</MenuItem>
                </SubMenu>
            </Menu>
        </Sidebar>
    );
}

export default SideBar;
    