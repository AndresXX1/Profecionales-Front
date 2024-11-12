import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { toast, ToastContainer } from 'react-toastify';

const ImgStyled = styled('img')(({ theme }) => ({
    width: 160,
    height: 160,
    marginRight: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        textAlign: 'center',
        backgroundColor: "#e8c39e"
    },
}));

const PerfilDeUsuario = () => {
    const [imgSrc, setImgSrc] = useState('/1.png');
    const [userData, setUserData] = useState({
        nombre: '',
        apellido: '',
        telefono: '',
        country: '',
        address: '',
        age: '',
        gender: '',
        imagen: '', // Campo para la imagen
    });

    const isValidToken = (token) => {
        if (!token) return false;
        try {
            jwtDecode(token);
            return true;
        } catch {
            return false;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token && isValidToken(token)) {
            const decoded = jwtDecode(token);
            console.log('Datos decodificados del token:', decoded);
            setUserData({
                nombre: decoded.nombre || '',
                apellido: decoded.apellido || '',
                telefono: decoded.telefono || '',
                country: decoded.country || '',
                address: decoded.address || '',
                age: decoded.age || '',
                gender: decoded.gender || '',
                imagen: decoded.imagen || '', // Cargar imagen del token
            });
            setImgSrc(decoded.imagen || '/1.png'); // Cargar imagen desde el token
        } else {
            console.log('Token inválido o no encontrado');
        }
    }, []);

    const onChange = (file) => {
        const reader = new FileReader();
        const { files } = file.target;
        if (files && files.length > 0) {
            reader.onload = () => {
                setImgSrc(reader.result);
                setUserData((prevState) => ({
                    ...prevState,
                    imagen: reader.result, // Guardar la imagen en el estado
                }));
            };
            reader.readAsDataURL(files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken');
        if (!token || !isValidToken(token)) {
            console.error('Token inválido o no encontrado');
            toast.error('Por favor, inicie sesión nuevamente');
            return;
        }

        const userId = jwtDecode(token).userId;

        try {
            const response = await fetch(`https://whatsapp-bot-oleo.onrender.com/api/usuarios/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Datos del usuario actualizados:', data);

                // Actualiza el token en el almacenamiento local
                localStorage.setItem('authToken', data.token);

                // Actualiza los datos del usuario en el estado
                setUserData({
                    nombre: data.usuario.nombre || '',
                    apellido: data.usuario.apellido || '',
                    telefono: data.usuario.telefono || '',
                    country: data.usuario.country || '',
                    address: data.usuario.address || '',
                    age: data.usuario.age || '',
                    gender: data.usuario.gender || '',
                    imagen: data.usuario.imagen || '', // Actualiza la imagen
                });

                toast.success('Datos actualizados con éxito');
            } else {
                console.error('Error al actualizar los datos:', response.statusText);
                toast.error('Error al actualizar los datos');
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            toast.error('Error al actualizar los datos');
        }
    };

    return (
        <CardContent>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3, marginRight: "20px" }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ImgStyled src={imgSrc} alt='Profile Pic' />
                            <Box>
                                <Typography variant='body1' sx={{ marginLeft: 15 }}>
                                    <ButtonStyled
                                        component='label'
                                        variant='contained'
                                        htmlFor='upload-image'
                                        sx={{ marginRight: '-20px', backgroundColor: "#e8c39e", color: "black" }}
                                    >
                                        Subir Nueva Foto
                                        <input
                                            hidden
                                            type='file'
                                            accept='image/png, image/jpeg'
                                            onChange={onChange}
                                            id='upload-image'
                                        />
                                    </ButtonStyled>
                                </Typography>
                                <Typography variant='body2' sx={{ marginTop: 1, marginLeft: 13 }}>
                                    PNG o JPEG. Máx. 800K.
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    {['nombre', 'apellido', 'telefono', 'address', 'age', 'country', 'gender'].map((field, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            {field === 'country' ? (
                                <FormControl fullWidth>
                                    <InputLabel>País</InputLabel>
                                    <Select
                                        label='País'
                                        value={userData.country}
                                        name='country'
                                        onChange={(e) => setUserData({ ...userData, country: e.target.value })}
                                    >
                                        <MenuItem value='Argentina'>Argentina</MenuItem>
                                        <MenuItem value='Colombia'>Colombia</MenuItem>
                                        <MenuItem value='Brasil'>Brasil</MenuItem>
                                    </Select>
                                </FormControl>
                            ) : (
                                <TextField
                                    fullWidth
                                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                                    placeholder={field}
                                    value={userData[field]}
                                    name={field}
                                    onChange={(e) => setUserData({ ...userData, [field]: e.target.value })}
                                />
                            )}
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <Button type='submit' variant='contained' sx={{ marginRight: 3.5, backgroundColor: "#e8c39e", color: "black" }}>
                            Guardar Cambios
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <ToastContainer />
        </CardContent>
    );
};

export default PerfilDeUsuario;
