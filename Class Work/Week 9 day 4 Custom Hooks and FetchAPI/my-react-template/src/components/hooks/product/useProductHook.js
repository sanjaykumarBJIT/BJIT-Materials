import { useState, useEffect } from "react";

const useProductHook = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);


     fetch(`http://localhost:8000/products/getAll`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log("Data : ", data);
        setProductData(data);
        setLoading(false);

        return data;
      })
      .catch((err) => {
        return "Some error";
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { productData, loading, setLoading };
};

export default useProductHook;