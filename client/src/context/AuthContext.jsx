import { createContext, useContext, useState } from "react";
import { registerRequest, loginRequest } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleErrors = (error) => {
    if (Array.isArray(error)) {
      setErrors(error);
    } else if (typeof error === 'string') {
      setErrors([error]);
    } else if (typeof error === 'object' && error !== null) {
      setErrors(Object.values(error));
    } else {
      setErrors(['An unknown error occurred']);
    }
  };

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      handleErrors(error.response.data);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
      setErrors([]); // Limpiar errores previos
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        setErrors([error.response.data.message || 'An error occurred during login']);
      } else {
        setErrors(['An unexpected error occurred']);
      }
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider 
    value={{ 
        signup, 
        signin,
        user, 
        isAuthenticated,
        errors 
        }}>
      {children}
    </AuthContext.Provider>
  );
};
