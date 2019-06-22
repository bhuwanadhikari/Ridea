import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './containers/Home/Home';
import Landing from './containers/Landing/Landing';
import Chat from './components/Chat/Chat';

import './App.css';


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }




  render() {
    return (
      <Router>
        <div style={{ height: '100%' }} className="App">
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/" component={Home} />
            <Route exact path="/chat" component={Chat} />
          </Switch>
        </div>
      </Router>
    );
  }
}


export default App;
