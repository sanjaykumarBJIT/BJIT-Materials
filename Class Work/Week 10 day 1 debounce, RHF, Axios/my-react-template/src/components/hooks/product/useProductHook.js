import { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

const useProductHook = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    axiosInstance
      .get("/getAll")
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;
          console.log("Data : ", data);
          setProductData(data);
        } else {
          console.error("Failed to fetch data");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { productData, loading, setLoading };
};

export default useProductHook;
