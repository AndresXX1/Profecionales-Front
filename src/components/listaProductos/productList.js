// ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCardsList from '../productCardList/productCardList'; // Correcta importación
import { Grid } from '@mui/material';

const ProductList = ({ onAddToBudget }) => {
  const [productos, setProductos] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Obtener productos desde el backend
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/productos');
        setProductos(response.data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };
    fetchProductos();
  }, []);

  const handleSelectProduct = (producto) => {
    if (selectedProducts.includes(producto)) {
      setSelectedProducts(selectedProducts.filter(p => p !== producto));
    } else {
      setSelectedProducts([...selectedProducts, producto]);
    }
  };

  const handleGenerateBudget = () => {
    onAddToBudget(selectedProducts);
  };

  return (
    <div>
      <h2>Lista de Productos</h2>
      <ProductCardsList
        productos={productos}
        selectedProducts={selectedProducts}
        onSelectProduct={handleSelectProduct}
      />
      <button onClick={handleGenerateBudget}>Generar presupuesto</button>
    </div>
  );
};

export default ProductList;
