/* eslint-disable no-undef */
import React, { Component } from 'react';

import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import SideDrawer from '../../components/SideDrawer/SideDrawer';
import Maps from '../Maps/Maps';
// import keys from '../../config/keys';



import './Home.css'


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showDrawer: false,
      currentLocation: {
        lat: 28.238284883392780,
        lng: 83.99134304265554
      },
      isCurrentLocationSet: false
    }
  }

  drawerToggleClickHandler = () => {
    this.setState({ showDrawer: !this.state.showModal });
  }


  onBackdropClickHandler = () => {
    this.setState({ showDrawer: false })
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState(prevState => ({
            currentLocation: {
              ...prevState.currentLocation,
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          }));
          this.setState({ isCurrentLocationSet: true });

        }
      );
    } else {
      console.log("cannot be updated");
    }
  }



  render() {
    return (
      <div className="Home">
        <NavBar clicked={this.drawerToggleClickHandler} />


        <div className='BodyWrapper'>
          <Maps
            isMarkerShown={false}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`}
            // googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${keys.googleAPIKey}`}
            loadingElement={<div style={{ height: `100vw` }} />}
            containerElement={<div style={{ height: `100vh` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            direction={true}
            currentLocation={this.state.currentLocation}
            isCurrentLocationSet={this.state.isCurrentLocationSet}
          />
        </div>
        <SideDrawer
          show={this.state.showDrawer}
          drawerClosed={() => {
            this.setState({ showDrawer: false });
          }}
        />

        <Footer />
      </div>
    );
  }
}


export default App;
