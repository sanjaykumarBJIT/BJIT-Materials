import React from 'react';
import Header from './header';
import "./header.style.css"

const NavBar = () => {
    return (
        <>
            <div className="nav-style">
                <div className='title-search'>
                    <div class="search-title"><h2>Amazon Lite</h2></div>
                    <div class="search">
                        <input type="text" class="search-Input" placeholder="Search for items.." />
                        <button type="submit" class="searchButton">
                            <i class="fa fa-search icon"></i>
                        </button>
                    </div>
                </div>  
                <div>
                    <Header />
                </div>
            </div>
        </>
    )
}

export default NavBar
