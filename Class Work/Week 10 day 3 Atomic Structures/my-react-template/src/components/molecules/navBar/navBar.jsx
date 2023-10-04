import React from 'react';
import Modal from '../Modal/modal';
import Button from '../../atoms/buttons/button';

const NavBar = ({ isModalOpen,openModal,closeModal,cart,total }) => {

  return (
    <div className="header-style">
      <ul className="ulist">
        <li><a href="#" className="link">Products</a></li>
        <li><a href="#" className="link">Categories</a></li>
        <li>
          <Button onClick={openModal}><i className="fa fa-cart-shopping"></i></Button>
          {isModalOpen && <Modal cart={cart} total={total} closeModal={closeModal}/>} 
        </li>
        <li><a href="#" className="link">Sign in</a></li>
      </ul>
    </div>
  );
};

export default NavBar;
