// RequireAuth.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (token) {
      navigate('/supervisor');
    }
  }, [token, navigate]);

  return children;
};

export default RequireAuth;
