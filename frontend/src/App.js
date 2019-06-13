import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './containers/Home';
import Landing from './containers/Landing';



class App extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }


  render() {
    return (
      <Router>
        <Switch>
          <div style={{ height: '100%' }} className="App">
            <Route exact path = "/home" component = {Home} />
            <Route exact path = "/" component = {Landing} />
          </div>
        </Switch>
      </Router>
    );
  }
}


export default App;
