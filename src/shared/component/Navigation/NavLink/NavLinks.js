import React from 'react';

import { NavLink } from 'react-router-dom';
import './NavLinks.css';
function NavLinks(props) {
  return (
    <ul className='nav-links'>
      <li onClick={props.closeDrawer}>
        <NavLink to='/' exact>
          All user
        </NavLink>
      </li>
      <li onClick={props.closeDrawer}>
        <NavLink to='/u1/places'>My Place </NavLink>
      </li>
      <li onClick={props.closeDrawer}>
        <NavLink to='/login'>Login</NavLink>
      </li>
      <li onClick={props.closeDrawer}>
        <NavLink to='/places/new'>All Place</NavLink>
      </li>
      <li onClick={props.closeDrawer}>
        <NavLink to='/logout'>Logout</NavLink>
      </li>
    </ul>
  );
}

export default NavLinks;
