// src/components/context/UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [isRegister, setIsRegister] = useState(false); // Cambia a true si quieres mostrar el registro primero

  const togglePage = () => {
    setIsRegister(prev => !prev);
  };

  return (
    <UserContext.Provider value={{ isRegister, togglePage }}>
      {children}
    </UserContext.Provider>
  );
};
