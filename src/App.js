import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Users from './user/pages/Users';
import NewPlaces from './places/pages/NewPlaces';
import MainNavigation from './shared/component/Navigation/MainNavigation/MainNavigation';

function App() {
  return (
    <>
      <MainNavigation />
      {/* // for giving margin  */}
      <main>
        <Switch>
          <Route path='/places/new' component={NewPlaces} exact></Route>
          <Route path='/' component={Users}></Route>
          <Redirect to='/' />
        </Switch>
      </main>
    </>
  );
}

export default App;
