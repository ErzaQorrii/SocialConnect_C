import React,{useState} from 'react';
import { Home, PostAdd } from '@mui/icons-material';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import Test_user from './Test_user';
import Contact from './Contact';
import './normal_user.css';
import Settings from '@mui/icons-material/Settings';
import Notifications from '@mui/icons-material/Notifications';
import HelpOutline from '@mui/icons-material/HelpOutline';
import PersonOutline from '@mui/icons-material/PersonOutline';
import CreatePost from './CreatePost';
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
    <Sidebar collapsed={collapsed} className="sidebar">
      <Menu>
        <MenuItem icon={<Home />}>Home</MenuItem>
        <MenuItem icon={<PostAdd />} onClick={handleCreatePostClick}>Create Post</MenuItem>
        <MenuItem icon={<Settings />}>Settings</MenuItem>
        <MenuItem icon={<Notifications  />}>Notifications</MenuItem>
        <MenuItem icon={<HelpOutline  />}>Help</MenuItem>
      </Menu>
      <button onClick={handleToggleSidebar} className="toggle-button">Toggle Sidebar</button>
    </Sidebar>
    

  );
}
export default Homepage_user;
