import React, { useEffect, useState } from 'react';
import './App.css';
import Body from './components/templates/body';
import useFetch from './hooks/product/useProductHook';
import useProductHook from "./hooks/product/useProductHook"

function App() {
  const { productData, loading  } = useProductHook();

  console.log(productData.data);

  return (
    <>
      <Body bookData={productData} loading={loading} />
    </>
  );
}

export default App;
