import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/products",
  timeout: 5000,
});

export default axiosInstance;