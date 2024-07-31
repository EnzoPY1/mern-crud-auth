//import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh' 
    }}>
      <h1>Welcome to our Task Manager</h1>
      <p>Organize your tasks efficiently and boost your productivity!</p>
      
      {!isAuthenticated && (
        <button 
          onClick={handleLoginClick}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          Log In
        </button>
      )}
    </div>
  );
}

export default HomePage;