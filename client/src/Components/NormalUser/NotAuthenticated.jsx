import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotAuthenticated = () => {
  const navigate = useNavigate(); 

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/login");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return <div>You are not authenticated to do such an action. Redirecting to login page...</div>;
};

export default NotAuthenticated;
