
import React from 'react';
import './App.css';
import Login from './Components/LoginSignup/Login';
import Signup from './Components/LoginSignup/Signup';
import TestUser from './Components/NormalUser/TestUser';
import TestAdmin from './Components/Admin/TestAdmin';
import HomepageUser from './Components/NormalUser/HomepageUser';
import CreatePost from './Components/NormalUser/CreatePost';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';



function App() {



  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />  
      <Route path="/login" element={<Login action="Login" />} />       
      <Route path="/signup" element={<Signup action="Sign Up" />} />             
      <Route path="/user" element={<TestUser />} />                
      <Route path="/admin" element={<TestAdmin />} />   
      <Route path="/home_user" element={<HomepageUser/>}/>
      <Route path="/create_post"element= {<CreatePost/>} />

    </Routes>
  </BrowserRouter>
  
  );
}

export default App;
