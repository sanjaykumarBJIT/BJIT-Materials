import { useState } from "react";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance"

const useUpdateProduct = () => {
  const [updatedProduct, setUpdatedProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateProduct = async (name, updatedData) => {
    setLoading(true);
    setError(null);
    console.log(name, updatedData);

    try {
      const response = await axiosInstance.put(
        `/updateByName?name=${name}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to update product.");
      }

      setUpdatedProduct(updatedData);

      alert("Product updated successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { updatedProduct, error, loading, updateProduct };
};

export default useUpdateProduct;
