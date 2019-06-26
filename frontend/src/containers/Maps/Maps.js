import React, { Component } from 'react';
// import Pindrop from './Pindrop/Pindrop';
import './Maps.css';
import axios from 'axios';






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
                lat: this.props.currentLocation.lat,
                lng: this.props.currentLocation.lng
            },
            pickupPoint: {
                lat: null,
                lng: null
            },
            isPickupPointSet: false,
            dropPoint: {
                lat: null,
                lng: null
            },
            isDropPointSet: false,
            arePointsReady: false,
            defaultZoom: 12,
            directions: null,
            isDirectionFetched: false

        }
    }

    static getDerivedStateFromProps(nextProps, state) {
        if (!nextProps.isCurrentLocationSet) {
            return { dynamicCenter: { ...nextProps.currentLocation } };
        } else if (nextProps.isCurrentLocationSet) {
            return { dynamicCenter: { ...state.dynamicCenter } };
        } else return null;
    }




    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currentLocation !== this.props.currentLocation) {
            this.setState({ defaultZoom: 16 })
        }
        if (this.state.arePointsReady && !this.state.isDirectionFetched) {
            const { pickupPoint, dropPoint } = this.state;

            const DirectionsService = new window.google.maps.DirectionsService();

            DirectionsService.route({
                origin: new window.google.maps.LatLng(pickupPoint.lat, pickupPoint.lng),
                destination: new window.google.maps.LatLng(dropPoint.lat, dropPoint.lng),
                travelMode: window.google.maps.TravelMode.DRIVING,
            }, (result, status) => {

                if (status === window.google.maps.DirectionsStatus.OK) {
                    this.setState({
                        directions: result,
                        isDirectionFetched: true,
                        isPickupPointSet: false,
                        isDropPointSet: false
                    });
                    console.log("Direction has be updated", this.state.directions);
                    axios
                        .post('/directions/add', { directionData: result })
                        .then(res => console.log(res.data))
                        .catch(err => console.log(err));
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            });
        }
    }

    componentDidMount() {
        axios
            .get('/directions/get')
            .then(allDirections => {
                console.log("all directions cata are as follows", allDirections.data);
                this.setState({directions: allDirections.data[2].directionData});
                console.log("Direction in the state", this.state.directions);
            })
            .catch(err => console.log(err));


    }



    onMarkerClickHandler = () => {

        const currentMark = this.state.dynamicCenter;
        const { isPickupPointSet, isDropPointSet } = this.state;

        if (!isPickupPointSet && !isDropPointSet) {
            this.setState({
                ...this.state,
                pickupPoint: { ...this.state.pickupPoint, ...currentMark },
                isPickupPointSet: true,
                defaultZoom: 14,
                dynamicCenter: { lat: this.state.dynamicCenter.lat - 0.010, lng: this.state.dynamicCenter.lng + 0.0150 }
            });
        } else if (isPickupPointSet && !isDropPointSet) {
            this.setState({
                dropPoint: { ...this.state.dropPoint, ...currentMark },
                isDropPointSet: true,
                dynamicCenter: { lat: this.state.dynamicCenter.lat + 0.0050, lng: this.state.dynamicCenter.lng - 0.00750 },
                defaultZoom: 13,
                arePointsReady: true
            });
        } else {
            console.log("Both points has been set");
        }
    }

    onPickupPointClickHandler = () => {
        console.log("pickup point clicked");
    }
    onDropPointClickHandler = () => {
        console.log("droppoint point clicked");
    }
    onCenterChangedHandler = () => {
        let center = this.mapRef.getCenter();
        let latitude = center.lat();
        let longitude = center.lng();
        this.setState({ dynamicCenter: { lat: latitude, lng: longitude }, testCenter: latitude });
        // console.log("Update center", this.state.dynamicCenter.lat, this.state.dynamicCenter.lng, "testCenter", this.state.testCenter);
    }







    render() {
        console.log("This is the pickup point", this.state.pickupPoint);
        console.log("This is the drop Point", this.state.dropPoint);



        let iconMarker = new window.google.maps.MarkerImage(
            "https://cdn4.iconfinder.com/data/icons/iconsimple-places/512/pin_1-512.png",
            null, /* size is determined at runtime */
            null, /* origin is 0,0 */
            null, /* anchor is bottom center of the scaled image */
            new window.google.maps.Size(42, 42)
        );

        return (
            <GoogleMap
                ref={(m) => this.mapRef = m}
                zoom={this.state.defaultZoom}

                center={{ lat: this.state.dynamicCenter.lat, lng: this.state.dynamicCenter.lng }}
                onCenterChanged={this.onCenterChangedHandler}
            >
                {true && <DirectionsRenderer directions={this.state.directions} />}


                {!this.state.arePointsReady
                    ? (<div className="MapMarker" onClick={this.onMarkerClickHandler}>
                        <img
                            className="MapMarkerImage"
                            src="https://lh3.googleusercontent.com/PYfOSWIKrftQS-GvIWRt5_QaqI6T3bS9p-KWkUNLFd1R6dCe1_kYmwcx53wr7qYNyRw"
                            alt="Map marker of Ridea app, taxi and ride sharing app Nepal and Pokhara"
                        />
                    </div>)
                    : null}

                }
                {this.state.isPickupPointSet
                    ? (<Marker
                        icon={iconMarker}
                        onClick={this.onPickupPointClickHandler}
                        position={{ lat: this.state.pickupPoint.lat, lng: this.state.pickupPoint.lng }}
                    >
                    </Marker>)
                    : null}
                {this.state.isDropPointSet ? (
                    <Marker
                        icon={iconMarker}
                        onClick={this.onPickupPointClickHandler}
                        position={{ lat: this.state.dropPoint.lat, lng: this.state.dropPoint.lng }}
                    >
                    </Marker>
                ) : null}

            </GoogleMap >
        )
    }
}


export default withScriptjs(withGoogleMap(Maps))