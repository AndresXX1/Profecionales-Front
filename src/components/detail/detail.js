// DetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Paper, Typography } from '@mui/material';

const DetailPage = () => {
    const { id } = useParams();
    console.log("ID del producto:", id);  // Agrega este log para verificar el id
    const [producto, setProducto] = useState(null);
  
    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/productos/detail/${id}`);
          setProducto(response.data);
        } catch (error) {
          console.error('Error al obtener el producto:', error);
        }
      };
  
      // Verificar que id esté disponible
      if (id) {
        fetchProduct();
      }
    }, [id]);
  
    if (!producto) return <Typography>Loading...</Typography>;
  
    return (
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h4">{producto.nombre}</Typography>
        <img src={producto.imagen} alt={producto.nombre} style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }} />
        <Typography variant="h6" sx={{ marginTop: 2 }}>Marca: {producto.marca}</Typography>
        <Typography variant="body1">Dimensiones: {producto.dimensiones}</Typography>
        <Typography variant="body1">Precio de lista: ${producto.precio_lista}</Typography>
        <Typography variant="body1">Precio de venta: ${producto.precio_venta}</Typography>
        <Typography variant="body1">Características: {producto.caracteristicas}</Typography>
        <Typography variant="body1">Proveedor: {producto.proveedor}</Typography>
      </Paper>
    );
  };
  
  export default DetailPage;
  