    import { MyContextVariables } from "../../App";
    import "./nav_right.style.scss";
    import React, { useContext } from 'react';
    const Nav_right = () => {
        const { cart, onClick } = useContext(MyContextVariables);
      
        const handleAddToCart = () => {
          const newCart = [...cart, newItem];
      
          onClick(newCart);
        };
        return (
            <>
                <div
                    className="header-style"
                >
                    <ul className="ulist">
                        <li><a href="#" class="link">Products</a></li>
                        <li><a href="#" class="link">Categories</a></li>
                        <li>
                            <button onClick={handleAddToCart}><i className="fa-solid fa-cart-shopping"></i></button>
                        </li>
                        <li><a href="#" class="link">Sign in</a></li>
                    </ul>

                </div>
            </>
        );
    };

    export default Nav_right;