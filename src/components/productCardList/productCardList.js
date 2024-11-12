// ProductCardsList.js
import React from 'react';
import { Grid } from '@mui/material';
import ProductCard from '../productCard/productCard';

const ProductCardsList = ({ productos, selectedProducts, onSelectProduct }) => {
  return (
    <Grid container spacing={3} justifyContent="center">
      {productos?.map((producto) => (
        <Grid item key={producto._id}>
          <ProductCard
            producto={producto}
            isSelected={selectedProducts.includes(producto)}
            onSelect={onSelectProduct}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductCardsList;
