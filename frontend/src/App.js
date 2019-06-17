import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';

import Home from './containers/Home';
import Landing from './containers/Landing/Landing';




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
            <Route exact path = "/home" component = {Home} />
            <Route exact path = "/" component = {Landing} />
        </Switch>
        </div>
      </Router>
    );
  }
}


export default App;
