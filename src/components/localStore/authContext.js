import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('auth') === 'true';
  });
  const [userData, setUserData] = useState(() => {
    const data = localStorage.getItem('userData');
    try {
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error parsing userData from localStorage:', error);
      return null; // o un valor por defecto
    }
  });

  const login = (user) => {
    setIsAuthenticated(true);
    localStorage.setItem('auth', 'true');
    localStorage.setItem('userData', JSON.stringify(user)); // Almacena la información del usuario
    setUserData(user);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('auth');
    localStorage.removeItem('userData'); // Elimina la información del usuario
    setUserData(null);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const isLoggedIn = localStorage.getItem('auth') === 'true';
      setIsAuthenticated(isLoggedIn);
      const data = localStorage.getItem('userData');
      setUserData(data ? JSON.parse(data) : null);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
