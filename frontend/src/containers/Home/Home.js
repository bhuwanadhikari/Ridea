/* eslint-disable no-undef */
import React, { Component } from 'react';

import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import SideDrawer from '../../components/SideDrawer/SideDrawer';
import Maps from '../Maps/Maps';
import Chat from '../../components/Chat/Chat';

import './Home.css'
import keys from '../../config/keys';







class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showDrawer: false,
      currentLocation: {
        lat: 28.256547,
        lng: 83.977735
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
    this.setCurrentLocation();
  }

  onLocateClickHandler = () => {
    this.setState((state, props) => { return { isCurrentLocationSet: false } });
    this.setCurrentLocation();
  }

  setCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState(prevState => ({
            currentLocation: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }

          }));
          this.setState({ isCurrentLocationSet: true });

        }
      );
    } else {
      console.log("Location cannot be updated");
    }
  }



  render() {
    return (

      <div className="Home">
        <NavBar clicked={this.drawerToggleClickHandler} />


        <div className='BodyWrapper'>
          <Maps
            isMarkerShown={false}
            // googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${keys.GOOGLE_API_KEY}`}
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

        
        <Chat />

        <Footer locateClicked={this.onLocateClickHandler} />
      </div>

    );
  }
}


export default App;
