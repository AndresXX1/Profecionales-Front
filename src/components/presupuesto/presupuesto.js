import React, { useState } from 'react';
import ProductList from '../listaProductos/productList'; // Asegúrate de importar ProductList correctamente
import BudgetModal from '../presupuesto/modal'; // Modal para mostrar el presupuesto

const Presupuesto = () => {
  const [budgetData, setBudgetData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Al hacer clic en "Generar presupuesto", establecer los productos seleccionados
  const handleAddToBudget = (selectedProducts) => {
    setBudgetData(selectedProducts);
    setIsModalOpen(true); // Abre el modal con los productos seleccionados
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Cerrar el modal
  };

  return (
    <div>
      <h1>Generador de Presupuesto</h1>
      <ProductList onAddToBudget={handleAddToBudget} />
      <BudgetModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        budgetData={budgetData}
      />
    </div>
  );
};

export default Presupuesto;