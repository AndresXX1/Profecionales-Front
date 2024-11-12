import React, { useState } from 'react';
import { TextField, Button, Grid, Box, Typography, Container, Snackbar, Alert } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// Estilo de fondo y de caja (contorno)
const formStyles = {
    backgroundColor: '#f7f7f7',  // Gris suave
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
};

// Colores del tema para el formulario
const colorTheme = {
    primary: '#FFC107', // Amarillo construcción
    secondary: '#455A64', // Gris oscuro
};

// Validaciones con Yup
const validationSchema = Yup.object({
    nombre: Yup.string().required('El nombre es obligatorio'),
    marca: Yup.string().required('La marca es obligatoria'),
    dimensiones: Yup.string().required('Las dimensiones son obligatorias'),
    imagen: Yup.string().url('Debe ser una URL válida').required('La URL de la imagen es obligatoria'),
    precio_lista: Yup.number().required('El precio de lista es obligatorio').positive('Debe ser un número positivo'),
    precio_venta: Yup.number().required('El precio de venta es obligatorio').positive('Debe ser un número positivo'),
    caracteristicas: Yup.string().required('Las características son obligatorias'),
    proveedor: Yup.string().required('El proveedor es obligatorio'),
});

const NuevoProducto = () => {
    const [open, setOpen] = useState(false);  // Para manejar la visibilidad de la notificación
    const [message, setMessage] = useState('');  // Mensaje a mostrar en la notificación
    const [severity, setSeverity] = useState('success');  // Tipo de notificación: success o error

    const formik = useFormik({
        initialValues: {
            nombre: '',
            marca: '',
            dimensiones: '',
            imagen: '',
            precio_lista: '',
            precio_venta: '',
            caracteristicas: '',
            proveedor: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://localhost:5000/api/productos/', values);
        
                if (response.status === 201) {
                    // Notificación de éxito
                    setMessage('Producto creado con éxito!');
                    setSeverity('success');
                    setOpen(true);
                    formik.resetForm();  // Limpiar el formulario después de éxito
                } else {
                    // Notificación de error
                    setMessage('Hubo un problema al crear el producto');
                    setSeverity('error');
                    setOpen(true);
                }
            } catch (error) {
                console.error(error);  // Verifica el error
                if (error.response && error.response.status === 400) {
                    setMessage(error.response.data.message || 'Error al crear el producto');
                    setSeverity('error');
                    setOpen(true);
                } else {
                    setMessage('Hubo un error de conexión');
                    setSeverity('error');
                    setOpen(true);
                }
            }
        }
    });

    // Cerrar la notificación
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container maxWidth="sm">
            <Box sx={formStyles}>
                <Typography variant="h5" gutterBottom align="center" color={colorTheme.primary}>
                    Nuevo Producto
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Nombre"
                                variant="outlined"
                                color="primary"
                                value={formik.values.nombre}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="nombre"
                                error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                                helperText={formik.touched.nombre && formik.errors.nombre}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Marca"
                                variant="outlined"
                                color="primary"
                                value={formik.values.marca}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="marca"
                                error={formik.touched.marca && Boolean(formik.errors.marca)}
                                helperText={formik.touched.marca && formik.errors.marca}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Dimensiones"
                                variant="outlined"
                                color="primary"
                                value={formik.values.dimensiones}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="dimensiones"
                                error={formik.touched.dimensiones && Boolean(formik.errors.dimensiones)}
                                helperText={formik.touched.dimensiones && formik.errors.dimensiones}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="URL Imagen"
                                variant="outlined"
                                color="primary"
                                value={formik.values.imagen}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="imagen"
                                error={formik.touched.imagen && Boolean(formik.errors.imagen)}
                                helperText={formik.touched.imagen && formik.errors.imagen}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Precio de Lista"
                                variant="outlined"
                                color="primary"
                                type="number"
                                value={formik.values.precio_lista}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="precio_lista"
                                error={formik.touched.precio_lista && Boolean(formik.errors.precio_lista)}
                                helperText={formik.touched.precio_lista && formik.errors.precio_lista}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Precio de Venta"
                                variant="outlined"
                                color="primary"
                                type="number"
                                value={formik.values.precio_venta}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="precio_venta"
                                error={formik.touched.precio_venta && Boolean(formik.errors.precio_venta)}
                                helperText={formik.touched.precio_venta && formik.errors.precio_venta}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Características"
                                variant="outlined"
                                color="primary"
                                multiline
                                rows={4}
                                value={formik.values.caracteristicas}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="caracteristicas"
                                error={formik.touched.caracteristicas && Boolean(formik.errors.caracteristicas)}
                                helperText={formik.touched.caracteristicas && formik.errors.caracteristicas}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Proveedor"
                                variant="outlined"
                                color="primary"
                                value={formik.values.proveedor}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="proveedor"
                                error={formik.touched.proveedor && Boolean(formik.errors.proveedor)}
                                helperText={formik.touched.proveedor && formik.errors.proveedor}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                type="submit"
                                sx={{ backgroundColor: colorTheme.primary }}
                            >
                                Crear Producto
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>

            {/* Snackbar para mostrar las notificaciones */}
            <Snackbar 
                open={open} 
                autoHideDuration={3000} 
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default NuevoProducto;
