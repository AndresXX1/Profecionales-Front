import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import EyeOutline from 'mdi-material-ui/EyeOutline';
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';
import { toast, ToastContainer } from 'react-toastify';
import FormHelperText from '@mui/material/FormHelperText';
import { useUserContext } from '../context/UserContext'; 
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
  const { togglePage } = useUserContext();
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
    name: '',
    email: '',
    phone: '',
    lastName: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });

  const [showTooltip, setShowTooltip] = useState(false);

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleChange = (prop) => (event) => {
    const value = event.target.value;
    setValues({ ...values, [prop]: value });
    setErrors({ ...errors, [prop]: validateField(prop, value) });
  };

  const validateField = (field, value) => {
    switch (field) {
      case 'name':
        return !value || value.length < 5 ? 'El nombre debe tener al menos 5 caracteres' : '';
      case 'lastName':
        return !value || value.length < 5 ? 'El apellido debe tener al menos 5 caracteres' : '';
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Ingresa un correo electrónico válido' : '';
      case 'phone':
        return !/^\d+$/.test(value) ? 'El teléfono solo puede contener números' : '';
      case 'password':
        return value.length < 8 ? 'La contraseña debe tener al menos 8 caracteres' : '';
      default:
        return '';
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {
      name: validateField('name', values.name),
      lastName: validateField('lastName', values.lastName),
      email: validateField('email', values.email),
      phone: validateField('phone', values.phone),
      password: validateField('password', values.password),
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {
      try {
        const response = await fetch('http://localhost:5000/api/usuarios/registro', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre: values.name,
            apellido: values.lastName,
            telefono: values.phone,
            email: values.email,
            contraseña: values.password,
          }),
        });

        if (response.ok) {
          toast.success('¡Registro exitoso!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
          });
          // Limpiar los campos después del registro exitoso
          setValues({
            password: '',
            showPassword: false,
            name: '',
            email: '',
            phone: '',
            lastName: '',
          });
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || 'Error al registrar el usuario.', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
          });
        }
      } catch (error) {
        toast.error('Error de conexión.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
        });
      }
    } else {
      toast.error('Por favor completa todos los campos correctamente.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };

  const handleTogglePage = () => {
    togglePage(); // Cambia a la página de inicio de sesión
  };

  const handleTooltip = () => {
    setShowTooltip(true); // Muestra la biñeta
  };

  const handleClick = () => {
    handleTooltip(); // Muestra la biñeta
    togglePage(); // Cambia a la página de inicio de sesión inmediatamente
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url(/robotillo.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 2,
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxHeight: "700px",
          maxWidth: '420px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: 4,
          borderRadius: 2,
          minHeight: '600px',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'black',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
        }}
      >
        <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5, marginBottom: "25px" }}>
          Crea tu cuenta y comienza la aventura! 🚀
        </Typography>
        
        <form noValidate autoComplete='off' onSubmit={handleFormSubmit}>
          <TextField
            fullWidth
            label='Nombre de usuario'
            sx={{ marginBottom: 2 }}
            value={values.name}
            onChange={handleChange('name')}
            error={Boolean(errors.name)}
            helperText={errors.name}
          />
          <TextField
            fullWidth
            label='Apellido'
            sx={{ marginBottom: 2 }}
            value={values.lastName}
            onChange={handleChange('lastName')}
            error={Boolean(errors.lastName)}
            helperText={errors.lastName}
          />
          <TextField
            fullWidth
            label='Teléfono'
            sx={{ marginBottom: 2 }}
            value={values.phone}
            onChange={handleChange('phone')}
            error={Boolean(errors.phone)}
            helperText={errors.phone}
          />
          <TextField
            fullWidth
            label='Email'
            sx={{ marginBottom: 2 }}
            value={values.email}
            onChange={handleChange('email')}
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel htmlFor='auth-register-password'>Contraseña</InputLabel>
            <OutlinedInput
              label='Password'
              value={values.password}
              id='auth-register-password'
              onChange={handleChange('password')}
              type={values.showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    onClick={handleClickShowPassword}
                    aria-label='toggle password visibility'
                  >
                    {values.showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
          </FormControl>
          <Button
            fullWidth
            size='large'
            variant='contained'
            type="submit"
          >
            Regístrate
          </Button>
        </form>
       
        <Box sx={{ position: 'relative', marginTop: "20px" }}>
          <Typography variant='body3'>¿Ya tienes cuenta?</Typography>
          <Typography onClick={handleClick} style={{ fontSize: "20px", color: "green", cursor: "pointer", marginLeft: "150px", marginTop: "-26px" }}>
            Inicia sesión
          </Typography>
          {showTooltip && (
            <Box
              sx={{
                position: 'absolute',
                top: '-20px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'white',
                padding: '10px 15px',
                borderRadius: '12px',
                border: '2px solid red',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.9)',
                zIndex: 10,
                transition: 'transform 0.3s ease',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                width: { xs: '90%', sm: '300px' },
                maxWidth: '200px',
                marginLeft: '-100px',
                '&:hover': {
                  transform: 'translateX(-50%) translateY(-5px)',
                },
              }}
            >
              <Typography variant='caption'>¡Haz clic nuevamente para volver a iniciar sesión!</Typography>
            </Box>
          )}
        </Box>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default RegisterPage;
