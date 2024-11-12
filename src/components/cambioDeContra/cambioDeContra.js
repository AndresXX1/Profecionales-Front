import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Button,
  Typography,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormHelperText,
  IconButton,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Función para decodificar el token JWT
const decodeToken = (token) => {
  if (!token) return null;
  const payload = token.split('.')[1];
  return JSON.parse(atob(payload));
};

const CambioDeContraseña = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    newPassword: '',
    currentPassword: '',
    confirmNewPassword: '',
  });
  const [errors, setErrors] = useState({
    newPassword: '',
    currentPassword: '',
    confirmNewPassword: '',
  });
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });
  const [open, setOpen] = useState(false);

  // Obtener userId del token
  const token = localStorage.getItem('authToken');
  const userId = token ? decodeToken(token)?.userId : null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' })); // Limpiar el error al cambiar el input

    // Validación en tiempo real
    if (name === 'confirmNewPassword' && value !== values.newPassword) {
      setErrors((prev) => ({ ...prev, confirmNewPassword: 'Las contraseñas no coinciden' }));
    } else {
      setErrors((prev) => ({ ...prev, confirmNewPassword: '' }));
    }

    const passwordError = validatePassword(value);
    if (name === 'newPassword' && passwordError) {
      setErrors((prev) => ({ ...prev, newPassword: passwordError }));
    } else if (name === 'newPassword') {
      setErrors((prev) => ({ ...prev, newPassword: '' }));
    }
  };

  const validatePassword = (newPassword) => {
    const passwordRequirements = [
      { regex: /.{8,}/, message: 'La contraseña debe tener al menos 8 caracteres.' },
      { regex: /[A-Z]/, message: 'La contraseña debe contener al menos una letra mayúscula.' },
      { regex: /[0-9]/, message: 'La contraseña debe contener al menos un número.' },
      { regex: /[!@#$%^&*.]/, message: 'La contraseña debe contener al menos un carácter especial.' },
    ];

    for (const { regex, message } of passwordRequirements) {
      if (!regex.test(newPassword)) {
        return message; // Retornar el mensaje de error
      }
    }
    return null; // No hay errores
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userId) {
      toast.error('El ID de usuario no está definido.');
      return;
    }

    if (values.newPassword === values.currentPassword) {
      setErrors((prev) => ({ ...prev, newPassword: 'La nueva contraseña no puede ser la misma que la contraseña actual.' }));
      return;
    }

    if (values.newPassword !== values.confirmNewPassword) {
      setErrors((prev) => ({ ...prev, confirmNewPassword: 'Las contraseñas no coinciden' }));
      return;
    }

    const passwordError = validatePassword(values.newPassword);
    if (passwordError) {
      setErrors((prev) => ({ ...prev, newPassword: passwordError }));
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/usuarios/${userId}/cambiar-contra`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || 'Error al cambiar la contraseña');
        return;
      }

      toast.success('Contraseña cambiada exitosamente');
      handleClickOpen(); // Abrir el modal después de éxito
    } catch (error) {
      toast.error('Error al cambiar la contraseña');
    }
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = (shouldLogout) => {
    setOpen(false);
    if (shouldLogout) {
      handleLogout();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
    window.location.reload(); // Forzar recarga de la página
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <ToastContainer />
      <Dialog open={open} onClose={() => handleClose(false)}>
        <DialogTitle>{"Aplicar Cambios"}</DialogTitle>
        <DialogContent>
          Para aplicar los cambios necesitas volver a iniciar sesión.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(true)}>Logout</Button>
        </DialogActions>
      </Dialog>
      <CardContent>
        <Grid container spacing={5}>
          <Grid item xs={12} display="flex" alignItems="flex-start">
            <Box flexGrow={1}>
              <Typography variant="h5" style={{ marginBottom: '16px' }}>
                Cambio de contraseña
              </Typography>
              <TextField
                label="Contraseña actual"
                type={showPassword.currentPassword ? 'text' : 'password'}
                name="currentPassword"
                value={values.currentPassword}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                InputProps={{
                  style: { height: '56px', fontSize: '16px' },
                  endAdornment: (
                    <IconButton onClick={() => togglePasswordVisibility('currentPassword')}>
                      {showPassword.currentPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
                error={!!errors.currentPassword}
              />
              <FormHelperText error>{errors.currentPassword}</FormHelperText>

              <TextField
                label="Nueva contraseña"
                type={showPassword.newPassword ? 'text' : 'password'}
                name="newPassword"
                value={values.newPassword}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                InputProps={{
                  style: { height: '56px', fontSize: '16px' },
                  endAdornment: (
                    <IconButton onClick={() => togglePasswordVisibility('newPassword')}>
                      {showPassword.newPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
                error={!!errors.newPassword}
              />
              <FormHelperText error>{errors.newPassword}</FormHelperText>

              <TextField
                label="Confirmar nueva contraseña"
                type={showPassword.confirmNewPassword ? 'text' : 'password'}
                name="confirmNewPassword"
                value={values.confirmNewPassword}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                InputProps={{
                  style: { height: '56px', fontSize: '16px' },
                  endAdornment: (
                    <IconButton onClick={() => togglePasswordVisibility('confirmNewPassword')}>
                      {showPassword.confirmNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
                error={!!errors.confirmNewPassword}
              />
              <FormHelperText error>{errors.confirmNewPassword}</FormHelperText>
            </Box>
            <img src="/config.png" alt="Configuración" style={{ height: '220px', marginTop: "70px", marginLeft: '16px' }} />
          </Grid>
        </Grid>
      </CardContent>
      <Box sx={{ mt: 2 }}>
        <Button type="submit" variant="contained" sx={{ backgroundColor: '#e8c39e', color: 'black' }}>
          Guardar Cambios
        </Button>
        <Button type="reset" variant="outlined" sx={{ backgroundColor: '#fffff', color: 'black' }}>
          Reiniciar
        </Button>
      </Box>
    </form>
  );
};

export default CambioDeContraseña;
