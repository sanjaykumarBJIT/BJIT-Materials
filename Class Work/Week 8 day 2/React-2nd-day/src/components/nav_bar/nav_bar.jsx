import React from 'react'
import Button from '../buttons/button'
import "./nav_bar.style.css"
const Nav_bar = () => {
    return (
        <div className='nav-bar-main'>
            <div className='nav-bar'>
                <div className='title'>
                    <h3>Bad Company</h3>
                </div>
                <div className='search-button'>
                    <div>
                        <input type="text"  className='search-Input' placeholder='Search anything here...' />
                    </div>
                    <div>
                        <Button />
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}

export default Nav_bar
