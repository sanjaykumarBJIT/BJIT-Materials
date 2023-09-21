import React from 'react';
import "./product.style.css"
import iPhoneImg from "../assets/iphone15.jpg"
const ProductCard = () => {
    return (
        <div className="product-card">
            <img src={iPhoneImg} alt="iPhone 15" />
            <h2>iphone</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero magni optio molestiae soluta expedita aut, rerum magnam? Dolore placeat aperiam deserunt ab maiores quia neque assumenda quod provident quaerat. Neque.</p>
            <p>Price: 999$</p>  
        </div>
    );
};

export default ProductCard;
