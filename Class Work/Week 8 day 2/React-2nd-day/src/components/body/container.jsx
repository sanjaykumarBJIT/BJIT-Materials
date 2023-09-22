import React from 'react'
import "./container.style.css"
import ProductCards from '../Cards/productCards'

const Container = () => {
  return (
    <div className='container-main'>
      <div>
        <ProductCards/>
      </div>
      <div>
        <ProductCards/>
      </div>
      <div>
        <ProductCards/>
      </div>
      <div>
        <ProductCards/>
      </div>
    </div>
  )
}

export default Container
