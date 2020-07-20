import React, { useCallback, useState, useEffect } from 'react';
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
import { useHttpHook } from './shared/Hooks/Http-hook';
import ErrorModal from './shared/component/UIELEMENT/ErrorModal/ErrorModal';

function App() {
  const [token, setToken] = useState();
  const [userID, setUserID] = useState(null);
  const [cookieFetch, setCookieFetch] = useState(false);
  // fetching token
  // have to do this state else logout will not be fast and it would have already rendered other component
  const [logoutOperation, setLogoutoperation] = useState(false);
  const { isLoading, error, fetchData, clearError } = useHttpHook();
  const login = useCallback((uid, token) => {
    setUserID(uid);
    setToken(token);
  }, []);
  const logout = useCallback(() => {
    let logoutUser;
    setLogoutoperation(true);
    try {
      logoutUser = async () => {
        await fetchData('http://localhost:5000/api/v1/users/logout', 'GET');
        setToken(null);
        setUserID(null);
        await setLogoutoperation(false);
      };
    } catch (error) {
      setLogoutoperation(false);
    }
    logoutUser();
  }, [fetchData]);

  useEffect(() => {
    let fetchToken;
    setCookieFetch(true);
    try {
      fetchToken = async () => {
        const res = await fetchData(
          'http://localhost:5000/api/v1/users/gettoken',
          'GET'
        );
        if (res.data.token && res.data.currentUser._id) {
          login(res.data.currentUser._id, res.data.token);
        }
      };
    } catch (error) {}
    fetchToken();
  }, [fetchData, login]);
  let route;
  if (cookieFetch && token && !isLoading && !logoutOperation) {
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
  } else if (cookieFetch && !isLoading && !logoutOperation) {
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
  // !! converts objetc to boolean and then checks for value if there is value than it will be true

  return (
    cookieFetch && (
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token,
          login: login,
          logout: logout,
          userID: userID,
        }}
      >
        <>
          <MainNavigation />
          {/* // for giving margin we have added class called main   */}
          {error && <ErrorModal error={error} onClear={clearError} />}
          <main>{route}</main>
        </>
      </AuthContext.Provider>
    )
  );
}

export default App;
