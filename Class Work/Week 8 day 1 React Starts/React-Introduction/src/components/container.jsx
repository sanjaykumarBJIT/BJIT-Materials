import React from 'react'
import ProductCard from './productCard'
function Container() {
  return (
    <div>
      <div className='product-container'>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
      </div>
    </div>
  )
}

export default Container

