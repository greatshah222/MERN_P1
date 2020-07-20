import React, { useContext } from 'react';

import { NavLink } from 'react-router-dom';
import './NavLinks.css';
import { AuthContext } from '../../../Context/AuthContext';
function NavLinks(props) {
  const { isLoggedIn, userID, logout } = useContext(AuthContext);

  return (
    <ul className='nav-links'>
      <li onClick={props.closeDrawer}>
        <NavLink to='/' exact>
          All user
        </NavLink>
      </li>
      {isLoggedIn && (
        <li onClick={props.closeDrawer}>
          <NavLink to={`/${userID}/places`}>My Place </NavLink>
        </li>
      )}

      {!isLoggedIn && (
        <li onClick={props.closeDrawer}>
          <NavLink to='/login'>Login</NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li onClick={props.closeDrawer}>
          <NavLink to='/places/new'>ADD Place</NavLink>
        </li>
      )}

      {isLoggedIn && (
        <li onClick={props.closeDrawer}>
          <button onClick={logout}>Logout</button>
        </li>
      )}
    </ul>
  );
}

export default NavLinks;
