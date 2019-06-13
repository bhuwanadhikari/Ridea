import React, { Component } from 'react'

import './Landing.css';

class Landing extends Component {
  render() {
    return (
      <div className = "LandingContainer">
        <div>
          <a href = 'http://localhost:5000/auth/google'>Login with google</a>
        </div>
      </div>
    )
  }
}

export default Landing
