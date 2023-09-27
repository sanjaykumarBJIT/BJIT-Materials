import React from 'react'

import "./nav_bar.style.css"
import SearchButton from '../buttons/searchButton'
import Nav_right from './nav_right'
const Nav_bar = () => {
    return (
        <div className='nav-bar-main'>
            <div className='nav-bar'>
                <div className='title'>
                    <h3>Nilkhet Book Store</h3>
                </div>
                <div className='search-button'>
                    <div>
                        <input type="text"  className='search-Input' placeholder='Search anything here...' />
                    </div>
                    <div>
                        <SearchButton/>
                    </div>
                </div>
            </div>
            <div>
                <Nav_right/>
            </div>
        </div>
    )
}

export default Nav_bar
