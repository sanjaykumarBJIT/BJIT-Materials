import React from 'react';
import './modal.style.scss';

const Modal = ({ cart, total, closeModal }) => {
  return (
    <div className="modal">
      <div className="content">
        <h2>Cart:</h2>
        <span className="close" onClick={closeModal}>&times;</span>
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
