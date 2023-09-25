import React, { useState } from 'react';
import "./container.style.css";
import ProductCards from '../Cards/productCards';

const Container = ({ bookData }) => {
  const [cart, setCart] = useState([]);


  const addToCart = (price) => {
    const updatedCart = [...cart, { price }];
    setCart(updatedCart);
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price, 0);
  };

  return (
    <div>
      <div className='banner'>
        <div className='banner-content'>
          <h2>Your everyday book store</h2>
        </div>
      </div>
      <div>
        <h2>Products:</h2>
      </div>
      <div className='container-main'>
        {bookData.length > 0 &&
          bookData.map((card, i) => {
            return (
              <div key={i}>
                <ProductCards
                  name={card.name}
                  shortDescription={card.shortDescription}
                  price={card.price}
                  imageLink={card.imageLink}
                />
                <button onClick={() => addToCart(card.price) } className="addToCartButton">Add to Cart</button>
              </div>
            );
          })}
      </div>
      <div>
        <h2>Total: {calculateTotalPrice()}$</h2>
      </div>
    </div>
  );
}

export default Container;
