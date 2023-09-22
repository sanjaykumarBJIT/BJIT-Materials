import React from 'react'
import "./productCards.style.css"

const ProductCards = () => {
  return (
    <div>
      <div className="product-card">
            <img src="https://www.trustedreviews.com/wp-content/uploads/sites/54/2022/10/Nvidia-GeForce-RTX-4090-7-scaled.jpg" className='product-img' alt="RTX 4090" />
            <h2>Nvidia RTX 4090</h2>
            <p>Most overpriced product of all time</p>
            <p>Price: 2999$</p>  
        </div>
    </div>
  )
}

export default ProductCards
