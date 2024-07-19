import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function LogoutHandler() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logout();
        navigate('/login');
      } catch (error) {
        console.error("Error during logout:", error);
        // Puedes manejar el error aquí, tal vez mostrando un mensaje al usuario
      }
    };

    handleLogout();
  }, [logout, navigate]);

  return <div>Logging out...</div>;
}

export default LogoutHandler;