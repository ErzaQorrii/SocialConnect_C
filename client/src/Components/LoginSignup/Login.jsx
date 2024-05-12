import React, { useState } from 'react';
import './LoginSignup.css'; 
import user_icon from '../Assets/person.png'; 
import password_icon from '../Assets/password.png';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
        error_list: [],
        
    });

    const handleInput = (e) => {
        e.persist();
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
const handleSubmission = (e) => {
    e.preventDefault(); 
    const endpoint = 'http://127.0.0.1:8000/api/auth/login';
    axios.get('/sanctum/csrf-cookie').then(response => {
        axios.post(endpoint, credentials).then(res => {
            console.log('Data:', res.data); 
            if (res.status === 200) {
                localStorage.setItem('auth_token', res.data.token);
                localStorage.setItem('auth_name', res.data.username); 
                localStorage.setItem('auth_role', res.data.user.role);
                console.log('Role received:', res.data.user.role); 

                if(res.data.user.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/user'); 
                }
            } else {
                swal("Warning", res.data.message, "warning"); 
            }
        })
        .catch(error => {
            console.error('Login error:', error); 
            swal("Error", "An error occurred during login. Please try again.", "error");
        });
    });
};

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>Log In</div>
                <div className='underline'></div>
            </div>
            <form onSubmit={handleSubmission}>
                <div className="inputs">
                    <div className="input">
                        <img src={user_icon} alt="Username"/>
                        <input type="text" name="username" placeholder='Username' onChange={handleInput} />
                    </div>
                    <div className="input">
                        <img src={password_icon} alt="Password"/>
                        <input type="password" name="password" placeholder='Password' onChange={handleInput} />
                    </div>
                </div>
                <div className="forgot-password">
                    Lost Password? <span>Click Here!</span>
                </div>
                <div className="submit-container">
                    
                    <button type="submit" className="submit">Log In</button>
                    <div className="signup-redirect">
                    Don't have an account? <span onClick={() => navigate('/signup')} style={{ cursor: 'pointer', color: 'blue' }}>Sign up</span>
                </div>
                </div>
               
            </form>
        </div>
    );
};

export default Login;
