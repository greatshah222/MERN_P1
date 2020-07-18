import React from 'react';
import UserItem from './UserItem';
import './UserList.css';
import Card from '../../shared/component/UIELEMENT/Card/Card';

function UserList(props) {
  if (props.items.length === 0) {
    return (
      <div className='center'>
        <Card>
          <h2>No Users Found</h2>
        </Card>
      </div>
    );
  }
  return (
    <ul className='users-list'>
      {props.items.map((el) => (
        <UserItem key={el._id} user={el} />
      ))}
    </ul>
  );
}

export default UserList;
