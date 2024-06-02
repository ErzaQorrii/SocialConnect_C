import React from 'react';
import { Home, PostAdd, Settings, Notifications, HelpOutline,Logout,Group } from '@mui/icons-material';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';
// import './normal_user.css';
import './sideBar.css'
import axiosInstance from './axiosSetup';
import  useNavigation from './navigationUtils';


const SidebarComponent = ({ collapsed, handleToggleSidebar }) => {
  const navigate = useNavigate();
  const handleCreatePostClick = () => navigate('/create_post');
  const token = localStorage.getItem('auth_token');
  const { goToProfile } = useNavigation();
  const {goToGroups} = useNavigation();
  const { goToFriends} = useNavigation();



  const handleLogOutClick = async () =>
    {
      try 
       {
        await axiosInstance.delete('/auth/logout');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_id');
        navigate('/login');
       }
       catch(error)
       {
        console.log('Error logging out',error);
       }
    }
    if (!token) {
      return null;
    }
  



    return (
      <Sidebar collapsed={collapsed} className="sidebar">
        <Menu>
          <MenuItem icon={<Home />}>Home</MenuItem>
          <MenuItem icon={<PostAdd />} onClick={handleCreatePostClick}>Create Post</MenuItem>
          <MenuItem icon={<Settings />} onClick={goToProfile}>Profile</MenuItem>
          <MenuItem icon={<Group />} onClick={goToGroups}>Groups</MenuItem>

          {/* <MenuItem icon={<Logout />} onClick={goToFriends}>Friendship</MenuItem> */}
          <MenuItem icon={<Logout />} onClick={handleLogOutClick}>Logout</MenuItem>
        

        </Menu>
        <button onClick={handleToggleSidebar} className="toggle-button">Toggle Sidebar</button>
      </Sidebar>
    );
  };

export default SidebarComponent;
