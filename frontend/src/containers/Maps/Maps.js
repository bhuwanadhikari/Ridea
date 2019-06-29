import React, { Component } from 'react';
import Auxi from '../../hoc/Auxi';
import RideData from './RideData/RideData';
import Modal from '../../ui/Modal/Modal';
import DialogBottom from '../../ui/DialogBottom/DialogBottom';

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
            areRideDataReady: false,

            rideData: {},

            defaultZoom: 12,

            directions: null,
            isDirectionFetched: false,

            progress: null,
            matchedRoutes: {
                fetched: [1, 2, 3, 4],
                selected: [],
                counter: 1
            }

        }
    }

    static getDerivedStateFromProps(nextProps, state) {
        if (!nextProps.isCurrentLocationSet) {
            return { dynamicCenter: { ...nextProps.currentLocation } };
        } else if (nextProps.isCurrentLocationSet) {
            return { dynamicCenter: { ...state.dynamicCenter } };
        } else return null;
    }



    //All the Update things
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currentLocation !== this.props.currentLocation) {
            this.setState({ defaultZoom: 16 })
        }

        if (this.state.progress === 'rideDataIsReady') {
            console.log("Both points have been set");
        }


        //Fetch the Route after ride data is ready
        if (this.state.progress === 'rideDataIsReady') {
            const { pickupPoint, dropPoint } = this.state;

            const DirectionsService = new window.google.maps.DirectionsService();

            DirectionsService.route({
                origin: new window.google.maps.LatLng(pickupPoint.lat, pickupPoint.lng),
                destination: new window.google.maps.LatLng(dropPoint.lat, dropPoint.lng),
                travelMode: window.google.maps.TravelMode.DRIVING,
            }, (result, status) => {
                console.log("Money has been consumed------------------------------------------------------------------");
                if (status === window.google.maps.DirectionsStatus.OK) {
                    this.setState({
                        directions: result,
                        isDirectionFetched: true,
                        isPickupPointSet: false,
                        isDropPointSet: false,
                        progress: 'directionIsFetched'
                    });
                    console.log("Direction has be updated", this.state.directions);
                    axios
                        .post('/directions/add', {
                            directionData: result,
                            rideData: this.state.rideData
                        })
                        .then(res => console.log(res.data))
                        .catch(err => console.log(err));
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            });
        }

        if (this.state.progress === 'dropPointIsSet') {

        }

    }

    componentDidMount() {
        axios
            .get('/directions/get')
            .then(allDirections => {
                // console.log("all directions cata are as follows", allDirections.data);
                this.setState({ directions: allDirections.data[2].directionData });
                console.log("Direction in the state", this.state.directions);
            })
            .catch(err => console.log(err));


    }


    // Fire Events when marker is clicked
    onMarkerClickHandler = () => {

        const currentMark = this.state.dynamicCenter;
        const { progress, isDropPointSet } = this.state;

        if (progress === null) {
            this.setState({
                ...this.state,
                pickupPoint: { ...this.state.pickupPoint, ...currentMark },
                progress: 'directionIsFetched',
                defaultZoom: 14,
                dynamicCenter: { lat: this.state.dynamicCenter.lat - 0.010, lng: this.state.dynamicCenter.lng + 0.0150 }
            });
        } else if (progress === 'pickupPointIsSet') {
            this.setState({
                dropPoint: { ...this.state.dropPoint, ...currentMark },
                progress: 'dropPointIsSet',
                dynamicCenter: { lat: this.state.dynamicCenter.lat + 0.0050, lng: this.state.dynamicCenter.lng - 0.00750 },
                defaultZoom: 13,
                arePointsReady: true
            });
        } else {
            console.log("Both points have been set");
        }
    }

    onCenterChangedHandler = () => {
        let center = this.mapRef.getCenter();
        let latitude = center.lat();
        let longitude = center.lng();
        this.setState({ dynamicCenter: { lat: latitude, lng: longitude }, testCenter: latitude });
        // console.log("Update center", this.state.dynamicCenter.lat, this.state.dynamicCenter.lng, "testCenter", this.state.testCenter);
    }

    //get ride data from rideData child component
    getRideDataHandler = (rideData) => {
        console.log('get ride data handler has been set', rideData);
        this.setState({ rideData, progress: 'rideDataIsReady' });
    }

    //continue to get matching routes
    onContinueHandler = () => {
        //fetch matching route
        //store it in a array
        if (this.state.matchedRoutes.fetched.length > 0) {
            this.setState({ progress: 'continuing' });
        } else {
            this.setState({ progress: 'noContinuing' });
            //nos show modal: register as independent route?

        }

        //loop dialogBottom as the number of elements


    }

    onCancelAllHandler = () => {
        this.setState({ progress: null });
    }

    onYesHandler = () => {
        //display matched route
        if (this.state.matchedRoutes.counter <= this.state.matchedRoutes.fetched.length) {
            console.log("inside the loop statement-----------------------")
            let selectedRoutes = this.state.matchedRoutes.selected;
            selectedRoutes.push(this.state.matchedRoutes.fetched[this.state.matchedRoutes.counter - 1]);
            this.setState({
                matchedRoutes: {
                    ...this.state.matchedRoutes,
                    selected: selectedRoutes,
                    counter: this.state.matchedRoutes.counter + 1
                }
            }, () => {
                console.log("after the async", this.state.matchedRoutes.counter);
                let condition = this.state.matchedRoutes.counter > this.state.matchedRoutes.fetched.length
                console.log("after the async", this.state.matchedRoutes.counter);
                if (this.state.matchedRoutes.selected.length > 0 && condition) {
                    this.setState({
                        progress: 'aboutToComplete'
                        //show modal to go back or done?
                    });
                } else if (this.state.matchedRoutes.selected.length < 1 && condition) {
                    this.setState({
                        progress: 'noSelectedRoutes',
                        //show modal to go back or done?
                    });
                }
            });
            console.log("just after setstate", this.state.matchedRoutes.counter);

        } else {
            //Check if user selected atleast one 

        }

    }

    onNoHandler = () => {
        if (this.state.matchedRoutes.counter <= this.state.matchedRoutes.fetched.length) {
            console.log("inside the loop statement-----------------------")

            this.setState({
                matchedRoutes: {
                    ...this.state.matchedRoutes,
                    counter: this.state.matchedRoutes.counter + 1
                }
            }, () => {
                let condition = this.state.matchedRoutes.counter > this.state.matchedRoutes.fetched.length
                console.log("after the async", this.state.matchedRoutes.counter);
                if (this.state.matchedRoutes.selected.length > 0 && condition) {
                    this.setState({
                        progress: 'almostComplete'
                        //show modal to go back or done?
                    });
                } else if (this.state.matchedRoutes.selected.length < 1 && condition) {
                    this.setState({
                        progress: 'noSelectedRoutes',
                        //show modal to go back or done?
                    });
                }
            });
        } else {

        }

    }




    render() {
        // console.log("This is the pickup point", this.state.pickupPoint);
        // console.log("This is the drop Point", this.state.dropPoint);
        console.log("Progress in the app is: ", this.state.progress);
        console.log("Condition of selected routes:", this.state.matchedRoutes);
        let dialogMessage, content;
        if (this.state.progress === 'continuing') {
            dialogMessage = 'Wanna share with this route?';
            content = (
                <Auxi>
                    <button onClick={this.onYesHandler}>Yes</button>
                    <button onClick={this.onNoHandler}>No</button>
                </Auxi>
            );
        }

        let iconMarker = new window.google.maps.MarkerImage(
            "https://cdn4.iconfinder.com/data/icons/iconsimple-places/512/pin_1-512.png",
            null, /* size is determined at runtime */
            null, /* origin is 0,0 */
            null, /* anchor is bottom center of the scaled image */
            new window.google.maps.Size(42, 42)
        );

        return (
            <Auxi>
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

                {/*----------- Modal to collect Ride data -----------*/}
                <Modal
                    show={this.state.progress === 'dropPointIsSet'} modalClosed={() => {
                        this.setState({ progress: 'null' });
                    }}
                    fromTop='27%'
                >
                    <RideData getRideData={this.getRideDataHandler} />
                </Modal>



                {/*----------- Modal to show No matching routes found -----------*/}
                <Modal
                    show={this.state.progress === 'dropPointIsSet'} modalClosed={() => {
                        this.setState({ progress: 'null' });
                    }}
                    fromTop='27%'
                >
                    No matching routes are found, cancel done
                </Modal>



                {/*----------- Modal to complete the matching and all    -----------*/}
                <Modal
                    show={this.state.progress === 'almostComplete'} modalClosed={() => {
                        this.setState({ progress: 'null' });
                    }}
                    fromTop='27%'
                >
                    Go back, done, cancel
                </Modal>




                {/*----------- Dialog at the bottom of screen -----------*/}
                <DialogBottom
                    show={
                        (this.state.progress === 'directionIsFetched'
                            || this.state.progress === 'continuing')}
                >
                    {this.state.progress === 'directionIsFetched'
                        ? "YOur routee has been fethetched"
                        : dialogMessage
                    }
                    {this.state.progress === 'directionIsFetched'
                        ? (
                            <Auxi>
                                <button onClick={this.onContinueHandler}>Continue</button>
                                <button onClick={this.onCancelAllHandler}>Cancel</button>
                            </Auxi>
                        )
                        : content}

                </DialogBottom>


            </Auxi >
        )
    }
}

export default withScriptjs(withGoogleMap(Maps))


// {/*-----------  -----------*/}