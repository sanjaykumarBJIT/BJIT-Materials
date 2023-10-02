import { useState,useContext } from 'react';
import "./header.style.scss"
import Modal from '../containerComponents/modal/modal';

import { MyContextVariables } from '../body';

const Header = () => {
    const { cart, total } = useContext(MyContextVariables);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='nav-bar-main'>
            <div className='nav-bar'>
                <div className='title'>
                    <h3>Nilkhet Book Store</h3>
                </div>
                <div className='search-button'>
                    <div>
                        <input type="text" className='search-Input' placeholder='Search anything here...' />
                    </div>
                    <button type="submit" className="searchButton">
                        <i className="fa fa-search icon"></i>
                    </button>
                </div>
            </div>
            <div>
                <div className="header-style">
                    <ul className="ulist">
                        <li><a href="#" className="link">Products</a></li>
                        <li><a href="#" className="link">Categories</a></li>
                        <li>
                            <button onClick={openModal}><i className="fa-solid fa-cart-shopping"></i></button>
                            {isModalOpen && <Modal cart={cart} total={total} closeModal={closeModal} />}
                        </li>
                        <li><a href="#" className="link">Sign in</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header;
