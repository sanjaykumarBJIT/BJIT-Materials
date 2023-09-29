import { useState, useEffect } from "react";

const useProductHook = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Define the createPost function
  const createPost = (formData) => {
    setLoading(true);
    console.log("The form data ", formData);
    fetch("http://localhost:8000/products/create", {
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => {
        alert("Product Created successfully!");

        // window.location.reload();
        console.log("Successfully created", data);
      })
      .finally(() => setLoading(false));
  };

  return { productData, loading, setLoading, createPost };
};

export default useProductHook;
