import React, { useState, useEffect } from 'react';
import "./container.style.css";
import ProductCards from '../Cards/productCards';
import Cart from '../cart/cart';
import Modal from '../modal/modal'; 
import Form from '../form/form';


const Container = ({ bookData }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const addToCart = (name, price) => {
    const updatedCart = [...cart, { name, price }];
    setCart(updatedCart);
    updateTotal(calculateTotalPrice(updatedCart));
  };

  useEffect(() => {
    console.log("Updated Cart:", cart);
  }, [cart]);

  const calculateTotalPrice = (cartItems) => {
    return cartItems.reduce((total, product) => total + product.price, 0);
  };

  const updateTotal = (newTotal) => {
    setTotal(newTotal);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='temp'>
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
                  addToCart={addToCart}
                />
              </div>
            );
          })}
      </div>
      <div>
        <button onClick={openModal}>View Cart</button>
        {isModalOpen && <Modal cart={cart} total={total} closeModal={closeModal} />}
      </div>
      {/* <Cart cart={cart} total={total} /> */}
      <div>
          <Form />
      </div>
      
    </div>
  );
}

export default Container;
