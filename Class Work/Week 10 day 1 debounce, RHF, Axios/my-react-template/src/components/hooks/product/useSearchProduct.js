import { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';

const useSearchData = (searchKeyword) => {
  const [searchData, setSearchedData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (searchKeyword) {
        setLoading(true);
        try {
          // Replace 'your-api-endpoint' with the actual API endpoint to fetch data
          const response = await axiosInstance.get(`/filterProducts?search=${searchKeyword}`);
          setSearchedData(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      } else {
        setSearchedData([]); // Clear data when searchKeyword is empty
      }
    };

    fetchData();
  }, [searchKeyword]);

  return { searchData, loading };
};

export default useSearchData;
