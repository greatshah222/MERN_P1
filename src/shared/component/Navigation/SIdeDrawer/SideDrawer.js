import React from 'react';
import ReactDOM from 'react-dom';

import { CSSTransition } from 'react-transition-group';
import './SideDrawer.css';

function SideDrawer(props) {
  // this will be rendered as a portal so we have added a new div in html file with id side-drawer
  // css transition is a npm package
  const content = (
    // classnames not classname and the property slide-in-left is defined in our css file it is just transform translate
    // in means it will only show the trnasition when in is true

    // mountonEnter and exit means to remove or add the elemnt completely
    // aside will only be visible when props.show is true
    <CSSTransition
      in={props.show}
      timeout={500}
      classNames='slide-in-left'
      mountOnEnter
      unmountOnExit
    >
      <aside className='side-drawer'>{props.children}</aside>
    </CSSTransition>
  );
  // created a new portal and our side drawer will be seperate from the main id root
  return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
}

export default SideDrawer;
