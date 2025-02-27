import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Protected = () => {
  const [email, setEmail] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('token');
        console.log('Cookies:', document.cookie); 
        if (!token) {
          throw new Error('No token found');
        }
        console.log('Token retrieved from cookie:', token);

        const response = await fetch('http://localhost:5000/api/auth/protected', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include' 
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Network response was not ok');
        }

        const result = await response.json();
        setEmail(result.user.email);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleBack = () => {
    navigate('/');
  };

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!email) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="protected-container">
      <h1 className="protected-header">Protected Data</h1>
      <p className="protected-content">Email: {email}</p>
      <button onClick={handleBack}>Back to Home</button>
    </div>
  );
};

export default Protected;