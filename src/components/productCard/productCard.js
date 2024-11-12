import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ producto, onSelect, isSelected }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Redirige al detalle del producto
    navigate(`/detail/${producto._id}`);  // Asegúrate de que producto._id sea válido
  };

  return (
    <Card sx={{ width: 300, margin: 2, border: '2px solid #f1c40f' }}>
      <CardMedia
        component="img"
        alt={producto.nombre}
        height="140"
        image={producto.imagen}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {producto.nombre}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Marca: {producto.marca}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Dimensiones: {producto.dimensiones}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Precio: ${producto.precio_venta}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color={isSelected ? 'success' : 'primary'}
          onClick={() => onSelect(producto)}
        >
          {isSelected ? 'Producto seleccionado' : 'Seleccionar producto'}
        </Button>
        <Button size="small" color="secondary" onClick={handleClick}>
          Ver detalle
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;