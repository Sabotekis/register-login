import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Protected = () => {
  const [email, setEmail] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token'); 

      if (!token) {
        setError('No token found');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/protected', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          }
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