import React from 'react';

const Cart = ({ cart, total }) => {
  return (
    <div>
      <h2>Cart:</h2>
      {cart.map((product, index) => (
        <div key={index}>
          <p>{product.name} - {product.price}$</p>
        </div>
      ))}
      <h2>Total: {total}$</h2>
    </div>
  );
};

export default Cart;
