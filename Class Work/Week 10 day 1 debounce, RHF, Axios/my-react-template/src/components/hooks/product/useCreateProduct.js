import { useState } from "react";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

const useProductHook = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Define the createPost function
  const createPost = (formData) => {
    setLoading(true);
    console.log("The form data ", formData);

    axiosInstance
      .post("/create", formData)
      .then((response) => {
        if (response.status === 200) {
          alert("Product Created successfully!");
          console.log("Successfully created", response.data);
        } else {
          console.error("Failed to create product");
        }
      })
      .catch((error) => {
        console.error("Error creating product:", error);
      })
      .finally(() => setLoading(false));
  };

  return { productData, loading, setLoading, createPost };
};

export default useProductHook;
