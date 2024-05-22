import React from 'react';
import { Home, PostAdd, Settings, Notifications, HelpOutline } from '@mui/icons-material';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';
// import './normal_user.css';
import './sideBar.css'

const SidebarComponent = ({ collapsed, handleToggleSidebar }) => {
  const navigate = useNavigate();
  const handleCreatePostClick = () => navigate('/create_post');

  return (
    <Sidebar collapsed={collapsed} className="sidebar">
      <Menu>
        <MenuItem icon={<Home />}>Home</MenuItem>
        <MenuItem icon={<PostAdd />} onClick={handleCreatePostClick}>Create Post</MenuItem>
        <MenuItem icon={<Settings />}>Settings</MenuItem>
        <MenuItem icon={<Notifications />}>Notifications</MenuItem>
        <MenuItem icon={<HelpOutline />}>Help</MenuItem>
      </Menu>
      <button onClick={handleToggleSidebar} className="toggle-button">Toggle Sidebar</button>
    </Sidebar>
  );
};

export default SidebarComponent;
