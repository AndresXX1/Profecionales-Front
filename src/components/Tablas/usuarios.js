import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import "../styles/users.css"

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [editableUser, setEditableUser] = useState(null);
    const [editableUserValues, setEditableUserValues] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsuarios = async () => {
            setLoading(true); // Inicia la carga
            setError(null); // Reinicia el error

            try {
                const response = await fetch('http://localhost:5000/api/usuarios', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsuarios(data);
                } else {
                    throw new Error(`Error: ${response.statusText}`);
                }
            } catch (error) {
                setError(error.message);
                console.error('Error al obtener usuarios:', error);
            } finally {
                setLoading(false); // Finaliza la carga
            }
        };

        fetchUsuarios();
    }, []);

    const handleEdit = (userId) => {
        setEditableUser(userId);
        setEditableUserValues((prevValues) => ({
            ...prevValues,
            [userId]: { ...usuarios.find((user) => user._id === userId) }, // Cambiar "id" a "_id"
        }));
    };

    const handleCancel = () => {
        setEditableUser(null);
        setEditableUserValues({});
    };

    const handleSave = async (userId) => {
        try {
            console.log('Datos a enviar:', editableUserValues[userId]); // Verifica los datos
            const response = await fetch(`https://whatsapp-bot-oleo.onrender.com/api/usuarios/${editableUserValues[userId]._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                },
                body: JSON.stringify(editableUserValues[userId]), // Asegúrate de que esto esté correcto
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUsuarios((prevUsuarios) =>
                    prevUsuarios.map((user) => (user._id === userId ? updatedUser.usuario : user)) // Cambiar "id" a "_id"
                );
                handleCancel();
            } else {
                console.error('Error al guardar los cambios:', response.statusText);
            }
        } catch (error) {
            console.error('Error al guardar los cambios:', error);
        }
    };

    const handleDelete = (userId) => {
        // Implementar lógica de eliminación de usuario
    };

    const handleInputChange = (userId, field, value) => {
        setEditableUserValues((prevValues) => ({
            ...prevValues,
            [userId]: {
                ...prevValues[userId],
                [field]: value,
            },
        }));
    };

    if (loading) return <Typography variant="h6" style={{ marginBottom: "20px", color: '#e8c39e' }}>Cargando usuarios...</Typography>;
    if (error) return <Typography variant="h6" color="error">{error}</Typography>;

    return (
        <div className="usuarios-container">
            <Typography 
                variant="h4" 
                style={{ marginBottom: "20px", color: '#e8c39e' }} 
            >
                Usuarios
            </Typography>
            <TableContainer component={Paper} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: 2 }}>
                <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#0a3a3a' }}>
                        <TableCell align="center" sx={{ color: 'white' }}>Nombre</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Apellido</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Teléfono</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Email</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Rol</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Fecha de Creación</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                    
                    <TableBody>
                        {usuarios.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell align="center">
                                    {editableUser === user._id ? (
                                        <TextField
                                            style={{ width: '120px' }}
                                            value={editableUserValues[user._id]?.nombre || ''}
                                            onChange={(e) => handleInputChange(user._id, 'nombre', e.target.value)}
                                        />
                                    ) : (
                                        user.nombre
                                    )}
                                </TableCell>
                                <TableCell align="center">
                                    {editableUser === user._id ? (
                                        <TextField
                                            style={{ width: '120px' }}
                                            value={editableUserValues[user._id]?.apellido || ''}
                                            onChange={(e) => handleInputChange(user._id, 'apellido', e.target.value)}
                                        />
                                    ) : (
                                        user.apellido
                                    )}
                                </TableCell>
                                <TableCell align="center">
                                    {editableUser === user._id ? (
                                        <TextField
                                            style={{ width: '120px' }}
                                            value={editableUserValues[user._id]?.telefono || ''}
                                            onChange={(e) => handleInputChange(user._id, 'telefono', e.target.value)}
                                        />
                                    ) : (
                                        user.telefono
                                    )}
                                </TableCell>
                                <TableCell align="center">
                                    {editableUser === user._id ? (
                                        <TextField
                                            style={{ width: '200px' }}
                                            value={editableUserValues[user._id]?.email || ''}
                                            onChange={(e) => handleInputChange(user._id, 'email', e.target.value)}
                                        />
                                    ) : (
                                        user.email
                                    )}
                                </TableCell>
                                <TableCell align="center">
                                    {editableUser === user._id ? (
                                        <FormControl fullWidth>
                                            <InputLabel id={`rol-label-${user._id}`}>Rol</InputLabel>
                                            <Select
                                                style={{ width: '120px' }}
                                                labelId={`rol-label-${user._id}`}
                                                value={editableUserValues[user._id]?.rol || user.rol}
                                                onChange={(e) => handleInputChange(user._id, 'rol', e.target.value)}
                                            >
                                                <MenuItem value="cliente">Cliente</MenuItem>
                                                <MenuItem value="admin">Admin</MenuItem>
                                                <MenuItem value="cocinero">Cocinero</MenuItem>
                                                <MenuItem value="encargado">Encargado</MenuItem>
                                                <MenuItem value="superAdmin">SuperAdmin</MenuItem>
                                            </Select>
                                        </FormControl>
                                    ) : (
                                        user.rol
                                    )}
                                </TableCell>
                                <TableCell align="center">
                                    {user.fechaCreacion}
                                </TableCell>
                                <TableCell align="center">
                                    <div className="actions">
                                        {editableUser === user._id ? (
                                            <>
                                                <Button onClick={() => handleCancel()}><CancelIcon /></Button>
                                                <Button onClick={() => handleSave(user._id)}><SaveIcon /></Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button onClick={() => handleEdit(user._id)}><EditIcon /></Button>
                                                <Button onClick={() => handleDelete(user._id)}><DeleteIcon /></Button>
                                            </>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Usuarios;
