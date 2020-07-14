import React from 'react';
import UserList from '../component/UserList';

function Users() {
  const USERS = [
    {
      id: 'U1',
      name: 'bishal',
      image: 'https://picsum.photos/500',
      placeCount: 3,
    },
  ];
  return <UserList items={USERS} />;
}

export default Users;
