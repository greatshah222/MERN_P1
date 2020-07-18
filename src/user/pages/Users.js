import React, { useEffect, useState } from 'react';
import UserList from '../component/UserList';

import axios from 'axios';
import LoadingSpinner from '../../shared/component/UIELEMENT/Spinner/LoadingSpinner';
import ErrorModal from '../../shared/component/UIELEMENT/ErrorModal/ErrorModal';

function Users() {
  const [users, SetUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const res = await axios({
          method: 'GET',
          url: 'http://localhost:5000/api/v1/users',
        });
        await SetUsers(res.data.data);
        setIsLoading(false);
        console.log(res.data.data);
      } catch (error) {
        console.log(error.response.data.message);
        setIsLoading(false);
        setError(error.response.data.message);
      }
    };
    fetchUser();
  }, []);
  const errorModalClearHandler = () => {
    setError(null);
  };
  return (
    <>
      <div className='center'>{isLoading && <LoadingSpinner asOverlay />}</div>

      {error && <ErrorModal error={error} onClear={errorModalClearHandler} />}
      {!isLoading && users && <UserList items={users} />}
    </>
  );
}

export default Users;
