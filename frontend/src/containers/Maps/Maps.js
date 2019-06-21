import React, { Component } from 'react';
import Pindrop from './Pindrop/Pindrop';
import './Maps.css';
const { compose, withProps, lifecycle } = require("recompose");





const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer,
    Marker,
} = require('react-google-maps');


class Maps extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dynamicCenter: {
                lat: 28.211904,
                lng: 83.987907
            },
            defaultZoom: 3,
            directions: null
        }
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        const { currentLocation } = nextProps
        console.log(prevState);
        return currentLocation;
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currentLocation !== this.props.currentLocation) {
            console.log("i think component has updated");
        }
    }



    onCenterChangedHandler = () => {
        let center = this.mapRef.getCenter();
        this.setState({ dynamicCenter: { lat: center.lat(), lng: center.lng() } });
        console.log(`Map center: ${this.state.dynamicCenter.lat}, ${this.state.dynamicCenter.lng} `)
    }


    componentDidMount() {
        const DirectionsService = new window.google.maps.DirectionsService();

        DirectionsService.route({
            origin: new window.google.maps.LatLng(28.201549, 83.970004),
            destination: new window.google.maps.LatLng(28.223537, 83.991109),
            travelMode: window.google.maps.TravelMode.DRIVING,
        }, (result, status) => {

            if (status === window.google.maps.DirectionsStatus.OK) {
                this.setState({
                    directions: result,
                });
            } else {
                console.error(`error fetching directions ${result}`);
            }
        });



    }


    render() {



        console.log("this is current locaiotn", this.props.currentLocation.lat);
        return (
            <GoogleMap
                ref={(m) => this.mapRef = m}
                zoom={this.state.defaultZoom}

                center={{ lat: this.props.currentLocation.lat, lng: this.props.currentLocation.lng }}
                onCenterChanged={this.onCenterChangedHandler}
            >
                {/*this.state.directions && <DirectionsRenderer directions={this.state.directions} />*/}
                <div className="MapMarker">
                    <img className="MapMarkerImage" src="https://lh3.googleusercontent.com/PYfOSWIKrftQS-GvIWRt5_QaqI6T3bS9p-KWkUNLFd1R6dCe1_kYmwcx53wr7qYNyRw" />
                </div>
            </GoogleMap >
        )
    }
}


export default withScriptjs(withGoogleMap(Maps))