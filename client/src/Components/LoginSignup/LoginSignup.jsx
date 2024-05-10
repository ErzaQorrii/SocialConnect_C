// import React, { useState, useEffect } from 'react';
// import './LoginSignup.css';
// import user_icon from '../Assets/person.png';
// import email_icon from '../Assets/email.png';
// import axios from 'axios';
// import password_icon  from '../Assets/password.png';
// import swal from 'sweetalert';
// import { useNavigate } from 'react-router-dom';


// const LoginSignup = () => {
//   const navigate = useNavigate();  
//   const [action, setAction] = useState("Sign Up");
//   const [credentials, setCredentials] = useState({
//       username: '',
//       name: '',
//       email: '',
//       password: '',
//       error_list: [],
//   });

//   const handleInput = (e) => {
//       e.persist();
//       setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

//   const handleSubmission = (e) => {
//     e.preventDefault();
//     console.log('creds here', credentials);
//     const endpoint = action === "Sign Up" ? 'http://127.0.0.1:8000/api/auth/register' : 'http://127.0.0.1:8000/api/auth/login';
//     axios.get('/sanctum/csrf-cookie').then(response => {
//         axios.post(endpoint, credentials).then(res => {
//             if (res.data.status === 200) {
//                 if (action === "Sign Up") {
//                     swal("Success", "Registration successful. Please log in.", "success").then((value) => {
//                         setAction("Log In"); 
//                         navigate('/login'); 
//                     });
//                 } else {
                   
//                     localStorage.setItem('auth_token', res.data.token);
//                     localStorage.setItem('auth_name', res.data.username); 
                    
//                     if (res.data.role === 'admin') {
//                         navigate('/Admin/Test_admin'); 
//                     } else {
//                         navigate('/NormalUser/Test_user'); 
//                     }
//                 }
//             } else if (res.data.status === 401) {
//                 swal("Warning", res.data.message, "warning");
//             } else {
//                 setCredentials({ ...credentials, error_list: res.data.validation_errors });
//             }
//             console.log('success!!');
//             console.log(`Action is now: ${action}`); // This should log "Log In" or "Sign Up"

//         })
//         .catch(error => {
//           if (error.response && error.response.status === 403) {
//             console.error('Access Forbidden: You do not have permission to perform this action.');
//             console.log(error);
//             // Handle specific 403 scenarios here
//           } else if (error.response) {
//             console.error('Error response:', error.response.data);
//           } else if (error.request) {
//             console.error('No response received:', error.request);
//           } else {
//             console.error('Error setting up request:', error.message);
//           }
//         });
//     });


// };

// return (
//     <div className='container'>
//       <div className='header'>
//         <div className='text'>{action}</div>
//         <div className='underline'></div>
//       </div>
//       <form onSubmit={handleSubmission}>
//         <div className="inputs">
//           {action === "Log In" ? (
//             <>
//               <div className="input">
//                 <img src={user_icon} alt="username"/>
//                 <input type="text" name="username" placeholder='username' onChange={handleInput} />
//               </div>
//               <div className="input">
//                 <img src={password_icon} alt="Password"/>
//                 <input type="password" name="password" placeholder='Password' onChange={handleInput} />
//               </div>
//             </>
//           ) : (
//             <>
//               <div className="input">
//                 <img src={user_icon} alt="Name"/>
//                 <input type="text" name="name" placeholder='Name' onChange={handleInput} />
//               </div>
//               <div className="input">
//                 <img src={user_icon} alt="Username"/>
//                 <input type="text" name="username" placeholder='Username' onChange={handleInput} />
//               </div>
//               <div className="input">
//                 <img src={email_icon} alt="Email"/>
//                 <input type="email" name="email" placeholder='Email' onChange={handleInput} />
//               </div>
//               <div className="input">
//                 <img src={password_icon} alt="Password"/>
//                 <input type="password" name="password" placeholder='Password' onChange={handleInput} />
//               </div>
//             </>
//           )}
//         </div>
//         {action === "Sign Up" ? null : <div className="forgot-password">Lost Password? <span>Click Here!</span></div>}
//         <div className="submit-container">
//           <button type="submit" className={action === "Log In" ? "submit gray" : "submit"}>
//             {action}
//           </button>
//           <button type="button" className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => setAction(action === "Sign Up" ? "Login" : "Sign Up")}>
//             {action === "Sign Up" ? "Log In" : "Sign Up"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default LoginSignup



import React, { useState } from 'react';
import './LoginSignup.css';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import axios from 'axios';
import password_icon  from '../Assets/password.png';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';


const LoginSignup = ({ action: initialAction }) => {
  const navigate = useNavigate();  
  const [action, setAction] = useState(initialAction);  const [credentials, setCredentials] = useState({
      username: '',
      name: '',
      email: '',
      password: '',
      error_list: [],
  });

  const handleInput = (e) => {
      e.persist();
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    console.log('creds here', credentials);
    const endpoint = action === "Sign Up" ? 'http://127.0.0.1:8000/api/auth/register' : 'http://127.0.0.1:8000/api/auth/login';
    axios.get('/sanctum/csrf-cookie').then(response => {
        axios.post(endpoint, credentials).then(res => {
          console.log('API Response:', res);
            if (res.data.status === 200) {
                if (action === "Sign Up") {
                    swal("Success", "Registration successful. Please log in.", "success").then((value) => {
                      console.log('Navigating to login...');

                       navigate('/login');
                    });
                } else {
                   
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username); 
                    
                    if (res.data.role === 'admin') {
                        navigate('/Admin/Test_admin'); 
                    } else {
                        navigate('/NormalUser/Test_user'); 
                    }
                }
            } else if (res.data.status === 401) {
                swal("Warning", res.data.message, "warning");
            } else {
                setCredentials({ ...credentials, error_list: res.data.validation_errors });
            }
            console.log('success!!');
           console.log(`Action is now: ${action}`); // This should log "Log In" or "Sign Up"

        })
        .catch(error => {
          if (error.response && error.response.status === 403) {
            console.error('Access Forbidden: You do not have permission to perform this action.');
            console.log(error);
            console.log(`Action is now: ${action}`); // This should log "Log In" or "Sign Up"

            // Handle specific 403 scenarios here
          } else if (error.response) {
            console.error('Error response:', error.response.data);
          } else if (error.request) {
            console.error('No response received:', error.request);
          } else {
            console.error('Error setting up request:', error.message);
          }
        });
    });
};

return (
    <div className='container'>
      <div className='header'>
        <div className='text'>{action}</div>
        <div className='underline'></div>
      </div>
      <form onSubmit={handleSubmission}>
        <div className="inputs">
          {action === "Login" ? (
            <>
              <div className="input">
                <img src={user_icon} alt="Username"/>
                <input type="text" name="username" placeholder='Username' onChange={handleInput} />
              </div>
              <div className="input">
                <img src={password_icon} alt="Password"/>
                <input type="password" name="password" placeholder='Password' onChange={handleInput} />
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
        {action === "Sign Up" ? null : <div className="forgot-password">Lost Password? <span>Click Here!</span></div>}
        <div className="submit-container">
          <button type="submit" className={action === "Login" ? "submit gray" : "submit"}>
            {action}
          </button>
          <button type="button" className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => setAction(action === "Sign Up" ? "Login" : "Sign Up")}>
            {action === "Sign Up" ? "Log In" : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginSignup
