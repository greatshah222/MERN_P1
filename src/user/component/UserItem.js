import React from 'react';
import Avatar from '../../shared/component/UIELEMENT/Avatar';
import { Link } from 'react-router-dom';
import Card from '../../shared/component/UIELEMENT/Card';
import './UserItem.css';

function UserItem(props) {
  return (
    <li className='user-item'>
      <Card className='user-item__content'>
        <Link to={`/${props.user.id}/ places`}>
          <div className='user-item__image'>
            <Avatar image={props.user.image} alt={props.user.name} />
          </div>
          <div className='user-item__info'>
            <h2>{props.user.name}</h2>
            <h3>
              {props.user.placeCount}{' '}
              {props.user.placeCount === 1 ? 'Place' : 'Places'}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
}

export default UserItem;
