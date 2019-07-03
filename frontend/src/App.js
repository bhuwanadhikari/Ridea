import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import setAuthToken from './utils/setAuthToken';

import store from './redux/store/store';
import BaseRoutes from './routes/baseRoutes';

import './App.css';


if (localStorage.jwtToken) {
  //set auth token header to be sent in every request
  setAuthToken(localStorage.jwtToken);
  //decode stored token
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user's statuses
  console.log("we are insdide", decoded);
  store.dispatch({ type: 'SET_USER', payload: decoded });
  /////////////////////////
  ///expiration code///////
  /////////////////////////
}

class App extends Component {
 
  render() {
    console.log("The environment now is:", process.env.NODE_ENV);
    return (
      <Provider store = {store}>
        <Router>
          <div style={{ height: '100%' }} className="App">
            <Switch>
              <BaseRoutes/>
            </Switch>
          </div>
        </Router>
      </Provider>

    );
  }
}


export default App;
