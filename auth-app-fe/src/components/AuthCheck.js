import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if 'auth' exists in localStorage  
    const auth = localStorage.getItem('auth');

    if (auth) {
      // If auth is found, redirect to the dashboard  
      navigate('/app');
    } else {
      // Optionally, you can handle the case when auth is not available  
      // e.g., show a login form or redirect to a login page  
      navigate('/signin');
    }

    // Cleanup function if necessary  
    // This can be left empty if you don't have any side effects to clean up  
    return () => {};
  }, [navigate]);

  return (
    <div>
      <h1>Checking Authentication...</h1>
    </div>
  );
};

export default AuthCheck;