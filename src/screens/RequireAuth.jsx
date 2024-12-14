// RequireAuth.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');
  const user = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    if (token && user) {
      if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/supervisor');
      }
    }
  }, [token, navigate, user]);

  return children;
};

export default RequireAuth;
