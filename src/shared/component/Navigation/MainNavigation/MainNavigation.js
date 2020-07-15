import React, { useState } from 'react';

import MainHeader from '../Header/MainHeader';
import { Link } from 'react-router-dom';
import NavLinks from '../NavLink/NavLinks';
import SideDrawer from '../SIdeDrawer/SideDrawer';
import './Mainnavigation.css';
import Backdrop from '../../UIELEMENT/BackDrop/Backdrop';

function MainNavigation() {
  const [openDrawer, setopenDrawer] = useState(false);
  const openDrawerHandler = () => {
    setopenDrawer((prevState) => !prevState);
  };
  return (
    <>
      {/* // side drawer is always there but will have the transiton on true os openDrawer */}
      {/* // show is passed as a props to define css transition */}
      <SideDrawer show={openDrawer}>
        <button onClick={openDrawerHandler} className='close-btn'>
          &times;
        </button>
        <nav className='main-navigation__drawer-nav'>
          <NavLinks closeDrawer={openDrawerHandler} />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button
          onClick={openDrawerHandler}
          className='main-navigation__menu-btn'
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className='main-navigation__title'>
          <Link to='/'>Your Places</Link>
        </h1>
        <nav className='main-navigation__header-nav'>
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
}

export default MainNavigation;
