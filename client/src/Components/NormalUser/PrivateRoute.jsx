import React from 'react'
import {Navigate} from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
        return(
      <Navigate to ="/not-authenticated"/>

        )
      }
    return children;
}

export default PrivateRoute
