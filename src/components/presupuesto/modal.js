// BudgetModal.js
import React from 'react';

const BudgetModal = ({ isOpen, onClose, budgetData }) => {
  if (!isOpen) return null;

  const total = budgetData.reduce((acc, product) => acc + product.precio_venta, 0);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Presupuesto</h3>
          <button onClick={onClose}>Cerrar</button>
        </div>
        <div className="modal-body">
          <div className="presupuesto-cabecera">
            <div>
              <strong>Número de presupuesto:</strong> #12345
            </div>
            <div>
              <strong>Fecha:</strong> {new Date().toLocaleDateString()}
            </div>
          </div>

          <div className="presupuesto-items">
            {budgetData.map((producto) => (
              <div key={producto._id} className="presupuesto-item">
                <p>{producto.nombre}</p>
                <p>${producto.precio_venta}</p>
              </div>
            ))}
          </div>

          <div className="presupuesto-total">
            <strong>Total:</strong> ${total}
          </div>

          <footer>
            <p>Gracias por elegirnos para tu proyecto de construcción.</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default BudgetModal;
