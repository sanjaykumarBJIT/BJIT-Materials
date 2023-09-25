import React from 'react';
import './productCards.style.css';
import Button from '../buttons/button';

const ProductCards = ({ name, price, shortDescription, imageLink }) => {
  console.log(price);
  return (
    <div className="product-card">
      <div className="image-container">
        <img
          src={imageLink}
          className="product-img"
        />
      </div>
      <div className="product-info">
        <h3>{name}</h3>
        <p className="product-description">{shortDescription}</p>
        <p className="product-price">Price: {price}$</p>

        {/* <Button /> */}
      </div>
    </div>
  );
};

export default ProductCards;
