import React from 'react';
import "./button.style.scss";

const Button = ({ onClick }) => {
  return (
    <div>
      <button type="button" className="addToCartButton" onClick={onClick}>
        Add to Cart
      </button>
    </div>
  );
}

export default Button;
