// import React from 'react';
// import './App.css';
// import LoginSignup from './Components/LoginSignup/LoginSignup';
// import Test_user from './Components/NormalUser/Test_user';
// import Test_admin from './Components/Admin/Test_admin';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// function App() {
//   return (
//     <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<Navigate replace to="/login" />} />  
//       <Route path="/login" element={<LoginSignup action="Log In" />} /> 
//       <Route path="/register" element={<LoginSignup action =" Sign Up" />} /> 
//       <Route path="/user" element={<Test_user />} />                
//       <Route path="/admin" element={<Test_admin />} />              
//     </Routes>
//   </BrowserRouter>
//   );
// }

// export default App;

import React from 'react';
import './App.css';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import Test_user from './Components/NormalUser/Test_user';
import Test_admin from './Components/Admin/Test_admin';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />  
      <Route path="/login" element={<LoginSignup action="Login" />} />       
      <Route path="/register" element={<LoginSignup action="Sign Up" />} />             
      <Route path="/user" element={<Test_user />} />                
      <Route path="/admin" element={<Test_admin />} />              
    </Routes>
  </BrowserRouter>
  );
}

export default App;
