import React,{useState} from 'react';
import { Home, PostAdd } from '@mui/icons-material';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';

import './normal_user.css';
import './postcard.css';
import Settings from '@mui/icons-material/Settings';
import Notifications from '@mui/icons-material/Notifications';
import HelpOutline from '@mui/icons-material/HelpOutline';
import PostCard from './PostCard'; 

import { useNavigate } from 'react-router-dom';





const Homepage_user = () => {

  //Side Bar
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleCreatePostClick = () => {
    
    navigate('/create_post');
  };
  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ display: 'flex' }}>
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
        <div style={{ flex: 1, padding: '20px' }}>
            {/* Render PostCard component with actual post data */}
            <PostCard 
                username="user1"
                imageUrl="post-image-url-1"
                caption="This is a sample caption"
                likesCount={10}
                comments={[
                    { id: 1, username: 'user2', text: 'Nice post!' },
                    { id: 2, username: 'user3', text: 'Great photo!' }
                ]}
            />
        </div>
    </div>
);
}

export default Homepage_user;
