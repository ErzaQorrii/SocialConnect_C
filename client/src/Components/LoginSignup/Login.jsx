import React, { useState } from 'react';
import './LoginSignup.css'; // Ensure this path matches your CSS file for styles
import user_icon from '../Assets/person.png'; // Ensure paths for assets are correct
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

    // Update state based on form input changes
    const handleInput = (e) => {
        e.persist();
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmission = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const endpoint = 'http://127.0.0.1:8000/api/auth/login'; // Change this to your actual login API endpoint

        // Fetch CSRF cookie before posting login data for Laravel backends
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(endpoint, credentials).then(res => {
                if (res.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    navigate('/user'); // Navigate to dashboard on successful login
                } else {
                    swal("Warning", res.data.message, "warning"); // Display warning if login fails
                }
            })
            .catch(error => {
                console.error('Login error:', error); // Log any error during login
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
                </div>
                <div className="signup-redirect">
                    Don't have an account? <span onClick={() => navigate('/signup')} style={{ cursor: 'pointer', color: 'blue' }}>Sign up</span>
                </div>
            </form>
        </div>
    );
};

export default Login;
