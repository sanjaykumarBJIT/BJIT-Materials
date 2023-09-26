import React from 'react';
import './modal.style.scss'; 

const Modal = ({ cart, total, closeModal }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>Cart:</h2>
        {cart.map((product, index) => (
          <div key={index}>
            <p>{product.name} - {product.price}$</p>
          </div>
        ))}
        <h3>Total: {total}$</h3>
      </div>
    </div>
  );
};

export default Modal;
