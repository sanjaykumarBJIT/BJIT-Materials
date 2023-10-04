import React from 'react';
import ProductCard from '../../molecules/cards/productCards';

const Container = ({ searchedData, addToCart, handleDelete, loading }) => {
  console.log("in the container",searchedData);
  return (
    <div className='container-main'>
      {loading === true ? (
        <h1>Loading...</h1>
      ) : (
        (searchedData?.length > 0 ? searchedData : []).map((card, i) => (
          <ProductCard
            key={i}
            card={card}
            addToCart={addToCart}
            handleDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
};

export default Container;
