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

    const validateInputs = async () =>
        {
            let errors = {};
            let isValid = true;
            if(!credentials.username)
                {
                    isValid = false;
                     errors["username"] = "Username is required";
                     
                }
                else
                {
                    try
                    {
                        const response =  await axios.post('http://127.0.0.1:8000/api/auth/check-username', { username: credentials.username });
                        if(!response.data.exists)
                            {
                                isValid = false;
                                errors["username"] = "Username does not exist";
                            }
                    }
                    catch(error)
                    {
                        console.error("Error chechking username",error);
                        errors["username"] = "An error occurred  while checking for username";
                        isValid = false;
                        console.log(error);
                    
                    }
                }
            
                if (!credentials.password) {
                    isValid = false;
                    errors["password"] = "Password is required.";
                } else if (credentials.password.length < 8) {
                    isValid = false;
                    errors["password"] = "Password should have at least 8 characters.";
                }
           
        
                setCredentials({ ...credentials, error_list: errors });
                return isValid;
            };




const handleSubmission =  (e) => {
    e.preventDefault(); 
    if(validateInputs()){
    const endpoint = 'http://127.0.0.1:8000/api/auth/login';
    axios.get('/sanctum/csrf-cookie').then(response => {
        axios.post(endpoint, credentials).then(res => {
            const { token, user } = res.data.data; 
            if (res.status === 200 &&  res.data.data.user) {
                localStorage.setItem('auth_token', token);
                localStorage.setItem('auth_name', user.username);
                localStorage.setItem('auth_role', user.role);
                localStorage.setItem('user_id',user.id);
                
                console.log('Role received:', user.role);
                navigate(user.role === 'admin' ? '/admin' : '/home_user');

            } else {
                swal("Warning", res.data.message, "warning"); 
            }
        })
        .catch(error => {
            let errors = {};

            if(error.response.data.message === "Invalid credentials" && error.response.status === 401){
                const message = error.response.data.message;
                errors["password"] = message;
                setCredentials({ ...credentials, error_list: errors });
            } else {
                swal("Error", "An error occurred during login. Please try again.", "error");
            }
            console.error('Login error:', error); 
        });
    });
}
           
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
                        {credentials.error_list.username && <span className='error'>{credentials.error_list.username}</span>}

                    </div>

                    <div className="input">
                        <img src={password_icon} alt="Password"/>
                        <input type="password" name="password" placeholder='Password' onChange={handleInput} />
                        {credentials.error_list.password && <span className='error'>{credentials.error_list.password}</span>}
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
