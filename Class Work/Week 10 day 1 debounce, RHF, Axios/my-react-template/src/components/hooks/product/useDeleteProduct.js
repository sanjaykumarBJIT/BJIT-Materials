import { useState } from "react";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

const useProductDeletion = () => {
  const [deletedProductId, setDeletedProductId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const deleteProduct = async (productId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.delete(
        `/deleteById?id=${productId}`
      );

      if (response.status !== 200) {
        throw new Error("Failed to delete product.");
      }

      setDeletedProductId(productId);

      alert("Product deleted successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { deletedProductId, error, loading, deleteProduct };
};

export default useProductDeletion;
