import React, { useCallback, useState } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Users from './user/pages/Users';
import NewPlaces from './places/pages/NewPlaces';
import MainNavigation from './shared/component/Navigation/MainNavigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Login from './user/pages/Login';
import Signup from './user/pages/Signup';
import { AuthContext } from './shared/Context/AuthContext';
function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const login = useCallback(() => {
    setisLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setisLoggedIn(false);
  }, []);

  let route;
  if (isLoggedIn) {
    route = (
      <Switch>
        <Route path='/places/new'>
          <NewPlaces />
        </Route>
        <Route path='/places/:placeId'>
          <UpdatePlace />
        </Route>

        <Route path='/:userId/places'>
          <UserPlaces />
        </Route>

        <Route path='/'>
          <Users />
        </Route>
        <Redirect to='/' />
      </Switch>
    );
  } else {
    route = (
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path='/:userId/places'>
          <UserPlaces />
        </Route>
        <Route path='/'>
          <Users />
        </Route>
        <Redirect to='/login' />
      </Switch>
    );
  }
  return (
    <AuthContext.Provider value={{ isLoggedIn, login: login, logout: logout }}>
      <>
        <MainNavigation />
        {/* // for giving margin we have added class called main   */}
        <main>{route}</main>
      </>
    </AuthContext.Provider>
  );
}

export default App;
