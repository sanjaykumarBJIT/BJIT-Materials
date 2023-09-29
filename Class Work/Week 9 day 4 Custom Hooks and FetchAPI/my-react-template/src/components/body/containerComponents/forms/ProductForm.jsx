import React, { useState } from 'react';
import useCreateProduct from "../../../hooks/product/useCreateProduct"

const ProductForm = () => {
  const { formData, setFormData, handleSubmit, error, loading } = useCreateProduct();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  return (
    <div>
      <h2>Create a New Product</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" onChange={handleInputChange} />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" onChange={handleInputChange} />
        </div>
        {/* Add other input fields as needed */}
        <button type="submit">Create Product</button>
      </form>
      {loading && <p>Creating product...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default ProductForm;
