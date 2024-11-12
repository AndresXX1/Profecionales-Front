import React from 'react';
import { useUserContext } from '../context/UserContext'; // Importa el hook
import LoginPage from '../login/login';
import RegisterPage from '../register/register';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const LandingPage = () => {
  const { isRegister, togglePage } = useUserContext(); // Usa el hook

  return (
    <Box>
      <Box sx={{ zIndex: 1, width: '100%', maxWidth: '400px' }}>
        {isRegister ? (
          <RegisterPage />
        ) : (
          <LoginPage onShowRegister={togglePage} />
        )}
        <Typography variant="body2" sx={{ mt: 2 }}>
          {isRegister ? "¿Ya tienes una cuenta?" : "¿No tienes una cuenta?"}
          <Button onClick={togglePage} sx={{ color: 'green' }}>
            {isRegister ? "Inicia sesión" : "Regístrate"}
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default LandingPage;