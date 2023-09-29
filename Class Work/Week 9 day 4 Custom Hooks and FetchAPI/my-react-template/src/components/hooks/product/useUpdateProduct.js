import { useState } from 'react';

const useUpdateProduct = () => {
  const [updatedProduct, setUpdatedProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateProduct = async (name, updatedData) => {
    setLoading(true);
    setError(null);
    console.log(name,updatedData);
    try {
      const response = await fetch(`http://localhost:8000/products/updateByName?name=${name}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update product.');
      }

      setUpdatedProduct(updatedData);

      alert('Product Updated successfully!');

    //   window.location.reload();

      alert('Product updated successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { updatedProduct, error, loading, updateProduct };
};

export default useUpdateProduct;
