import React from 'react';
import SearchBar from '../../molecules/searchBar/searchBar';
import NavBar from '../../molecules/navBar/navBar';

const Header = ({ searchKeyword, setSearchKeyword, openModal,cart,total,closeModal,isModalOpen }) => {
  return (
    <div className='header'>
      <div className='nav-bar-main'>
        <div className='nav-bar'>
          <div className='title'>
            <h3>Nilkhet Book Store</h3>
          </div>
          <SearchBar
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
          />
        </div>
        <NavBar openModal={openModal} cart={cart} total={total} closeModal={closeModal} isModalOpen={isModalOpen}/>
      </div>
    </div>
  );
};

export default Header;
