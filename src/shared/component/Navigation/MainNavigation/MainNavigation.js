import React from 'react';

import MainHeader from '../Header/MainHeader';
import { Link } from 'react-router-dom';
import './Mainnavigation.css';

function MainNavigation() {
  return (
    <MainHeader>
      <button className='main-navigation__menu-btn'>
        <span />
        <span />
        <span />
      </button>
      <h1 className='main-navigation__title'>
        <Link to='/'>Your Places</Link>
      </h1>
      <nav></nav>
    </MainHeader>
  );
}

export default MainNavigation;
