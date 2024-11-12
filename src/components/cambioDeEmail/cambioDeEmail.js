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
  IconButton
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const CambioDeEmail = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    contraseña: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    contraseña: '',
  });
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));

    // Validación en tiempo real
    if (name === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        setErrors((prev) => ({ ...prev, email: 'Ingrese un correo electrónico válido.' }));
      }
    }
  };

  const decodeToken = (token) => {
    if (!token) return null;
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificamos errores antes de enviar
    if (errors.email || errors.contraseña || !values.email || !values.contraseña) {
      toast.error('Corrija los errores antes de enviar.');
      return;
    }

    const authToken = localStorage.getItem('authToken');
    const userId = decodeToken(authToken)?.userId;

    if (!userId) {
      toast.error('Usuario no autenticado.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/usuarios/${userId}/cambiar-email`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          email: values.email,
          contraseña: values.contraseña,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || 'Error al cambiar el correo electrónico');
        return;
      }

      toast.success('Correo electrónico cambiado exitosamente');
      handleClickOpen();
    } catch (error) {
      toast.error('Error al cambiar el correo electrónico');
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
    window.location.reload();
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <>
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
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} display="flex" alignItems="flex-start">
              <Box flexGrow={1}>
                <Typography variant="h5" style={{ marginBottom: '16px' }}>
                  Cambio de correo electrónico
                </Typography>
                <TextField
                  label="Nuevo correo electrónico"
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                  InputProps={{ style: { height: '56px', fontSize: '16px' } }}
                  error={!!errors.email}
                />
                <FormHelperText error>{errors.email}</FormHelperText>

                <TextField
                  label="Contraseña actual"
                  type={showPassword.currentPassword ? "text" : "password"}
                  name="contraseña"
                  value={values.contraseña}
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
                  error={!!errors.contraseña}
                />
                <FormHelperText error={!!errors.contraseña}>{errors.contraseña}</FormHelperText>
              </Box>
              <img src="/config.png" alt="Configuración" style={{ height: '200px', marginLeft: '16px' }} />
            </Grid>
          </Grid>
        </CardContent>
        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" sx={{ backgroundColor: '#e8c39e', color: 'black' }}>
            Guardar Cambios
          </Button>
          <Button type="reset" variant="outlined" sx={{ backgroundColor: '#ffffff', color: 'black' }}>
            Reiniciar
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CambioDeEmail;
