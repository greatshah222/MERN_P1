import { useState, useCallback } from 'react';
import axios from 'axios';

export const useHttpHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // if we are sending the request but if the user presses the back button or something we want to cancel that request so that we dont get ant error

  const fetchData = useCallback(async (url, method, data, headers = {}) => {
    setIsLoading(true);
    try {
      const res = await axios({
        method,
        headers,
        url,
        data,
      });

      setIsLoading(false);
      setError(null);
      return res.data;
    } catch (error) {
      console.log(error.response.data.message);
      setIsLoading(false);
      setError(
        error.response.data.message || 'Something went wrong please try again'
      );
    }
  }, []);
  const clearError = () => {
    setError(null);
  };
  return { isloading, error, fetchData, clearError };
};
