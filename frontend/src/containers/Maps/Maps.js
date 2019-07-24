import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Auxi from '../../hoc/Auxi';
import RideData from './RideData/RideData';
import Modal from '../../ui/Modal/Modal';
import DialogBottom from '../../ui/DialogBottom/DialogBottom';
import Spinner from '../../ui/Spinnner/Spinner';
import AcceptReject from '../Requests/AcceptReject';

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
            loading: false,
            defaultZoom: 12,
            progress: null,

            dynamicCenter: {
                lat: this.props.currentLocation.lat,
                lng: this.props.currentLocation.lng
            },
            pickupPoint: {
                lat: 0,
                lng: 0
            },
            dropPoint: {
                lat: 0,
                lng: 0
            },

            rideData: {},
            directions: null,
            directionsOnShow: null,
            matchedRoutes: {
                fetched: [],
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
            console.log("ride data is ready");
        }

        const { responseProgress, activeDirection } = this.props.bell;
        const prevResponseProgress = prevProps.bell.responseProgress;
        if ((responseProgress !== prevResponseProgress) && responseProgress === 'REQUEST_IS_SHOWING') {
            this.setState({
                directionsOnShow: activeDirection.directionData
            });
        } else if ((responseProgress !== prevResponseProgress) && (responseProgress === 'NOTIFIEDBY_IS_FETCHED' || this.state.progress === null)) {
            this.setState({
                directionsOnShow: null
            })
        }
    }


    onCenterChangedHandler = () => {
        let center = this.mapRef.getCenter();
        let latitude = center.lat();
        let longitude = center.lng();
        this.setState({ dynamicCenter: { lat: latitude, lng: longitude } });
    }


    // Fire Events when marker is clicked
    onMarkerClickHandler = () => {

        const currentMark = this.state.dynamicCenter;
        const { progress } = this.state;

        if (progress === null) {
            this.setState({
                pickupPoint: { ...this.state.pickupPoint, lat: parseFloat(currentMark.lat), lng: parseFloat(currentMark.lng) },
                progress: 'pickupPointIsSet',
                defaultZoom: 15,
                dynamicCenter: { lat: parseFloat(this.state.dynamicCenter.lat) - 0.010, lng: parseFloat(this.state.dynamicCenter.lng) + 0.0150 }
            });
        } else if (progress === 'pickupPointIsSet') {
            this.setState({

                dropPoint: { lat: parseFloat(currentMark.lat), lng: parseFloat(currentMark.lng) },
                progress: 'dropPointIsSet',
                dynamicCenter: { lat: parseFloat(this.state.dynamicCenter.lat) + 0.0050, lng: parseFloat(this.state.dynamicCenter.lng) - 0.00750 },
                defaultZoom: 14,
            });
        } else {
            console.log("Both points have been set");
        }
    }


    //get ride data from rideData child component
    getRideDataHandler = (rideData, getDirectionFunction) => {
        console.log('get ride data handler has been set', rideData);
        this.setState({ rideData, progress: 'rideDataIsReady', isDirectionGoogled: false });
        this.getDirectionFunction();
    }


    getDirectionFunction = () => {
        const { pickupPoint, dropPoint } = this.state;
        const DirectionsService = new window.google.maps.DirectionsService();
        this.setState({ loading: true });

        DirectionsService.route({
            origin: new window.google.maps.LatLng(pickupPoint.lat, pickupPoint.lng),
            destination: new window.google.maps.LatLng(dropPoint.lat, dropPoint.lng),
            travelMode: window.google.maps.TravelMode.DRIVING,
        }, (result, status) => {
            console.log("Money has been consumed------------------------------------------------------------------");
            if (status === window.google.maps.DirectionsStatus.OK) {
                this.setState({
                    directions: result,
                    progress: 'directionIsFetched',
                    directionsOnShow: result,

                }, () => {
                    axios
                        .post('/api/directions/matched-routes', {
                            directionData: result,
                            rideData: this.state.rideData,
                        })
                        .then(matchedRoutes => {
                            console.log("Matching routes has been being fetched");
                            this.setState({
                                matchedRoutes: {
                                    ...this.state.matchedRoutes,
                                    fetched: matchedRoutes.data
                                },
                                loading: false
                            });
                        })
                        .catch(err => console.log(err));
                });

            } else {
                console.error(`error fetching directions ${result}`);
                this.resetState();
            }
        });
    }


    //continue to get matching routes
    onContinueHandler = () => {
        if (this.state.matchedRoutes.fetched.length > 0) {
            console.log("Test failed");
            this.setState({ progress: 'continuing' }, () => {
                const routeId = this.state.matchedRoutes.fetched[this.state.matchedRoutes.counter - 1];
                if (!this.state.loading) {
                    this.setState({ loading: true });
                    axios
                        .get(`/api/directions/route/${routeId}`)
                        .then((route) => {
                            if (route) {
                                console.log("Route is called by id", routeId, "and data is", route.data.directionData);

                                this.setState({
                                    directionsOnShow: route.data.directionData,
                                    loading: false
                                });
                            } else {
                                alert("Something went wrong");
                            }
                        }).catch((err) => {
                            console.log(err.response.data);
                        });
                }
            });
        } else {
            this.setState({ progress: 'noContinuing' });
        }
    }


    onYesHandler = () => {
        //display matched route



        if (this.state.matchedRoutes.counter <= this.state.matchedRoutes.fetched.length) {


            const routeId = this.state.matchedRoutes.fetched[this.state.matchedRoutes.counter];

            if (!this.state.loading) {
                this.setState({ loading: true });
                axios
                    .get(`/api/directions/route/${routeId}`)
                    .then((route) => {
                        if (route) {
                            console.log("Route is called by id", routeId, "and data is", route.data.directionData);
                            this.setState({
                                directionsOnShow: route.data.directionData,
                                loading: false
                            });
                        } else {
                            alert("Not direction data is found for the")
                        }
                    }).catch((err) => {
                        console.log(err.response.data, "in the on Yes handler");
                    });
            }



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
                        progress: 'almostComplete',
                        loading: false,
                        //show modal to go back or done?
                    });
                } else if (this.state.matchedRoutes.selected.length < 1 && condition) {
                    this.setState({
                        progress: 'noSelectedRoutes',
                        loading: false
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


            const routeId = this.state.matchedRoutes.fetched[this.state.matchedRoutes.counter];

            if (!this.state.loading) {
                this.setState({ loading: true });
                axios
                    .get(`/api/directions/route/${routeId}`)
                    .then((route) => {
                        if (route) {
                            console.log("Route is called by id", routeId, "and data is", route.data.directionData);
                            this.setState({
                                directionsOnShow: route.data.directionData,
                                loading: false
                            });
                        } else {
                            alert("Not direction data is found for the")
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
            }


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
                        progress: 'almostComplete',
                        directionsOnShow: 'null',
                        loading: false
                        //show modal to go back or done?
                    });
                } else if (this.state.matchedRoutes.selected.length < 1 && condition) {
                    this.setState({
                        progress: 'noSelectedRoutes',
                        directionsOnShow: null,
                        loading: false,
                        //show modal to go back or done?
                    });
                }
            });
        } else {

        }

    }


    onChooseAgainHandler = () => {
        this.setState({
            progress: 'continuing',
            matchedRoutes: {
                ...this.state.matchedRoutes,
                selected: [],
                counter: 1,
                loading: true,
            }
        }, () => {
            const routeId = this.state.matchedRoutes.fetched[0];

            if (!this.state.loading) {
                this.setState({ loading: true });
                axios
                    .get(`/api/directions/route/${routeId}`)
                    .then((route) => {
                        if (route) {
                            console.log("Route is called by id", routeId, "and data is", route.data.directionData);
                            this.setState({
                                directionsOnShow: route.data.directionData,
                                loading: false
                            });
                        } else {
                            alert("Not direction data is found for the")
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
            };
        })
    }


    //Handler for registering as new independent route
    onDoneHandler = () => {
        this.setState({ loading: true })
        axios
            .post('/api/directions/addition', {
                directionData: this.state.directions,
                rideData: this.state.rideData,
                selectedRoutes: this.state.matchedRoutes.selected,
            })
            .then(addedRoute => {
                console.log("Added route:", addedRoute.data);
                this.resetState();
            })
            .catch(err => {
                console.log(err.response.data, 'addition has been failed');
                this.resetState();
            });
    }

    resetState = () => {
        this.setState({
            progress: null,
            loading: false,
            pickupPoint: {
                lat: null,
                lng: null
            },
            dropPoint: {
                lat: null,
                lng: null
            },
            rideData: {},

            defaultZoom: 12,

            directions: null,
            directionsOnShow: null,
            matchedRoutes: {
                fetched: [],
                selected: [],
                counter: 1
            }
        });
    }

    onCancelAllHandler = () => {
        this.resetState();
    }




    render() {
        // console.log("State of the app: ", this.state);


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
            require('../../img/mapImg/point.png'),
            null, /* size is determined at runtime */
            (20, 20), /* origin is 0,0 */
            null, /* anchor is bottom center of the scaled image */
            new window.google.maps.Size(42, 42)
        );



        if (this.state.loading) {
            return <Spinner />
        }


        return (
            <Auxi>
                <GoogleMap
                    ref={(m) => this.mapRef = m}
                    zoom={this.state.defaultZoom}

                    center={{ lat: this.state.dynamicCenter.lat, lng: this.state.dynamicCenter.lng }}
                    onCenterChanged={this.onCenterChangedHandler}
                >
                    {this.state.directionsOnShow && (<DirectionsRenderer directions={this.state.directionsOnShow} />)}

                    {
                        (this.state.progress === null && !this.props.bell.responseProgress) || (this.state.progress === 'pickupPointIsSet')
                            ? (<div className="MapMarker">
                                <img
                                    onClick={this.onMarkerClickHandler}
                                    className="MapMarkerImage"
                                    src={require('../../img/mapImg/pindrop.png')}
                                    alt="Map marker of Ridea app, taxi and ride sharing app Nepal and Pokhara"
                                />
                            </div>)
                            : null}


                    {this.state.progress === 'pickupPointIsSet'
                        ? (<Marker
                            icon={iconMarker}
                            onClick={this.onPickupPointClickHandler}
                            position={{ lat: this.state.pickupPoint.lat, lng: this.state.pickupPoint.lng }}
                        >
                        </Marker>)
                        : null}
                    {this.state.progress === 'pickupPointIsSet' || this.state.progress === 'dropPointIsSet'
                        ? (<Marker
                            icon={iconMarker}
                            onClick={this.onPickupPointClickHandler}
                            position={{ lat: this.state.dropPoint.lat, lng: this.state.dropPoint.lng }}
                        >
                        </Marker>)
                        : null}

                </GoogleMap >

                {/*----------- Modal to collect Ride data --------------------------------------------------------*/}
                <Modal
                    show={this.state.progress === 'dropPointIsSet'}
                    modalClosed={this.onCancelAllHandler}
                    fromTop='27%'
                >
                    <RideData getRideData={this.getRideDataHandler} />
                </Modal>



                {/*----------- Modal to show noContinuing ---------------------------------------------*/}
                <Modal
                    show={this.state.progress === 'noContinuing'} modalClosed={() => {
                        this.setState({ progress: 'null', loading: false });
                    }}
                    fromTop='27%'
                >
                    No any matching routes for the routes you entere
                    <button onClick={this.onDoneHandler}>Done</button>
                    <button onClick={this.onCancelAllHandler}>Cancel</button>
                </Modal>


                {/*----------- Modal to complete the matching and all    --------------------------------------*/}

                <Modal
                    show={this.state.progress === 'almostComplete' || this.state.progress === 'noSelectedRoutes'} modalClosed={() => {
                        this.setState({ progress: 'null', loading: false });
                    }}
                    fromTop='27%'
                >
                    <button onClick={this.onChooseAgainHandler}>Choose routes again</button>
                    <button onClick={this.onDoneHandler}>Done</button>
                    <button onClick={this.onCancelAllHandler}>Cancel</button>
                </Modal>




                {/*----------- Continuing Dialog Bottom -----------*/}
                <DialogBottom
                    show={
                        (this.state.progress === 'directionIsFetched'
                            || this.state.progress === 'continuing')}
                >
                    {this.state.progress === 'directionIsFetched'
                        ? "Your route has been fetched."
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

                {/*----------- Accept Reject Bottom Dialog -----------*/}
                <DialogBottom
                    show={
                        this.props.bell.responseProgress === 'REQUEST_IS_SHOWING'

                    }
                >
                    <AcceptReject />
                </DialogBottom>


            </Auxi >
        )
    }
}

Maps.propTypes = {
    bell: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    bell: state.bell
})



export default connect(mapStateToProps)(withScriptjs(withGoogleMap(Maps)));


// {/*-----------  -----------*/}
