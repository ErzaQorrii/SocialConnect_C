import React, { useState } from 'react';
import './LoginSignup.css';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
        // console.log("Signup component is rendering");

    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        role:'user',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmission = (e) => {
        e.preventDefault();
        const endpoint = 'http://127.0.0.1:8000/api/auth/register';
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(endpoint, credentials).then(res => {
                if (res.status === 201) {
                    console.log("Registration successful, showing success alert.");
                    swal("Success", "Registration successful. Please log in.", "success").then((value) => {
                        console.log("Alert closed, navigating to login.");
                        navigate('/login');
                    });
                } else {
                    console.log("Registration failed, showing warning alert.");
                    swal("Warning", res.data.message, "warning");
                }
            }).catch(error => {
                console.error('Error during registration:', error);
                if (error.response) {
                    if (error.response.status === 403) {
                        console.error('Access Forbidden: You do not have permission to perform this action.');
                    } else {
                        console.error('Error response:', error.response.data);
                    }
                } else if (error.request) {
                    console.error('No response received:', error.request);
                } else {
                    console.error('Error setting up request:', error.message);
                }
            });
        }).catch(error => {
            console.error('Error obtaining CSRF cookie:', error);
        });
    };
    

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>Sign Up</div>
                <div className='underline'></div>
            </div>
            <form onSubmit={handleSubmission}>
                <div className="inputs">
                    <div className="input">
                        <img src={user_icon} alt="Name"/>
                        <input type="text" name="name" placeholder='Name' onChange={handleInput} />
                    </div>
                    <div className="input">
                        <img src={user_icon} alt="Username"/>
                        <input type="text" name="username" placeholder='Username' onChange={handleInput} />
                    </div>
                    <div className="input">
                        <img src={email_icon} alt="Email"/>
                        <input type="email" name="email" placeholder='Email' onChange={handleInput} />
                    </div>
                    <div className="input">
                        <img src={password_icon} alt="Password"/>
                        <input type="password" name="password" placeholder='Password' onChange={handleInput} />
                    </div>
                </div>
                <div className="submit-container">
                    <button type="submit" className="submit">Sign Up</button>
                </div>
            </form>
        </div>
    );
};

export default Signup;
