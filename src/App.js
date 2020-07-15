import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Users from './user/pages/Users';
import NewPlaces from './places/pages/NewPlaces';
import MainNavigation from './shared/component/Navigation/MainNavigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';

function App() {
  return (
    <>
      <MainNavigation />
      {/* // for giving margin we have added class called main   */}
      <main>
        <Switch>
          {/* // rout new method */}
          <Route path='/places/new'>
            <NewPlaces />
          </Route>
          <Route path='/:userId/places'>
            <UserPlaces />
          </Route>
          <Route path='/'>
            <Users />
          </Route>
          <Redirect to='/' />
        </Switch>
      </main>
    </>
  );
}

export default App;
