import React from "react";
import "./App.css";
import Login from "./Components/LoginSignup/Login";
import Signup from "./Components/LoginSignup/Signup";
import TestUser from "./Components/NormalUser/TestUser";
import TestAdmin from "./Components/Admin/TestAdmin";
import HomepageUser from "./Components/NormalUser/HomepageUser";
import CreatePost from "./Components/NormalUser/CreatePost";
import EditPost from "./Components/NormalUser/EditPost ";
import NotAuthenticated from "./Components/NormalUser/NotAuthenticated";
import PrivateRoute from "./Components/NormalUser/PrivateRoute";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login action="Login" />} />
        <Route path="/signup" element={<Signup action="Sign Up" />} />
        <Route path="/not-authenticated" element={<NotAuthenticated />} />
        <Route path="/home_user" element={<PrivateRoute><HomepageUser /></PrivateRoute>} />
        <Route path="/create_post" element={<PrivateRoute><CreatePost /></PrivateRoute>} />
        <Route path="/edit-post/:id" element={<PrivateRoute><EditPost /></PrivateRoute>} />

        {/* <Route path="/user" element={<TestUser />} />                
      <Route path="/admin" element={<TestAdmin />} />    */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
