import { useState } from 'react';

const useProductDeletion = () => {
  const [deletedProductId, setDeletedProductId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const deleteProduct = async (productId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:8000/products/deleteById?id=${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product.');
      }

      setDeletedProductId(productId);

      alert('Product deleted successfully!');

    //   window.location.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { deletedProductId, error, loading, deleteProduct };
};

export default useProductDeletion;
