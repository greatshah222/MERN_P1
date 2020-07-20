import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../shared/component/UIELEMENT/Avatar/Avatar';
import Card from '../../shared/component/UIELEMENT/Card/Card';

import './UserItem.css';

function UserItem(props) {
  return (
    <li className='user-item'>
      <Card className='user-item__content'>
        <Link to={`/${props.user._id}/places`}>
          <div className='user-item__image'>
            <Avatar
              image={`http://localhost:5000/uploads/images/${props.user.image}`}
              alt={props.user.name}
            />
          </div>
          <div className='user-item__info'>
            <h2>{props.user.name}</h2>
            <h3>
              {props.user.places.length}{' '}
              {props.user.places.length === 0 ? 'Place' : 'Places'}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
}

export default UserItem;
