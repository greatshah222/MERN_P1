import { useState, useCallback, useRef, useEffect } from 'react';
import axios from 'axios';

export const useHttpHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // if we are sending the request but if the user presses the back button or something we want to cancel that request so that we dont get an error.

  /**
   * First step is to create the ref so that its value does not changes through out all the render cycle.
   *
   * const activeHttpRequests = useRef([]);
   *
   *
   * Second step is to create the abort controller. it is already present in all the browser so no need to import any package.Do this iniside the fetchData function
   * 
   * 
   * const httpAbortController = new AbortController();          
    // storing abort controller in the ref so that it will not change if the component re-renders
    activeHttpRequests.current.push(httpAbortController);
   * 
   * 3rd step is to include in the axios as signal 
   * 
   *  signal: httpAbortController.signal,
   * 
   * 
   *  Final step is the clean up function so to remove it when the components unmounts
   * 
   * 
   * 
   * 
   *  useEffect(() => {
    
    return () => {
      activeHttpRequests.current.forEach((el) => el.abort());
    };
  }, []);
   *
   */
  // useRef stores the data across the re-render cycle
  const activeHttpRequests = useRef([]);

  const fetchData = useCallback(async (url, method, data, headers = {}) => {
    setIsLoading(true);
    // if the request is made we can abort with the help of ABORTCONTROLEER
    const httpAbortController = new AbortController();
    // storing abort controller in the ref so that it will not change if the component re-renders
    activeHttpRequests.current.push(httpAbortController);

    try {
      const res = await axios({
        method,
        headers,
        url,
        data,
        // pointing to our abort controller
        signal: httpAbortController.signal,
      });

      // after we get the response we need to abort our controllern which os just completed
      activeHttpRequests.current = activeHttpRequests.current.filter(
        (el) => el !== httpAbortController
      );

      setIsLoading(false);
      setError(null);

      return res.data;
    } catch (error) {
      console.log(error.response.data.message);
      setIsLoading(false);
      setError(
        error.response.data.message || 'Something went wrong please try again'
      );
      // we have to throw the error so that it can be caught by other component
      throw error;
    }
  }, []);
  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    // when the compomnent unmounts. in our clean up we will abort all the request for the next component or render cycle(if the components unmount)
    return () => {
      activeHttpRequests.current.forEach((el) => el.abort());
    };
  }, []);
  return { isLoading, error, fetchData, clearError };
};
