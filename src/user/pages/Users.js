import React, { useEffect, useState } from 'react';
import UserList from '../component/UserList';

import LoadingSpinner from '../../shared/component/UIELEMENT/Spinner/LoadingSpinner';
import ErrorModal from '../../shared/component/UIELEMENT/ErrorModal/ErrorModal';
import { useHttpHook } from '../../shared/Hooks/Http-hook';

function Users() {
  const [users, SetUsers] = useState([]);
  const { isLoading, error, fetchData, clearError } = useHttpHook();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetchData(
          'http://localhost:5000/api/v1/users',
          'GET'
        );
        SetUsers(res.data);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchUser();
  }, [fetchData]);

  return (
    <>
      <div className='center'>{isLoading && <LoadingSpinner asOverlay />}</div>

      {error && <ErrorModal error={error} onClear={clearError} />}
      {!isLoading && users && <UserList items={users} />}
    </>
  );
}

export default Users;
