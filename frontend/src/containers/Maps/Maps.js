import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Auxi from '../../hoc/Auxi';
import RideData from './RideData/RideData';
import Modal from '../../ui/Modal/Modal';
import DialogBottom from '../../ui/DialogBottom/DialogBottom';
import Spinner from '../../ui/Spinnner/Spinner';
import AcceptReject from '../Requests/AcceptReject';
import HisLocation from './HisLocation';
import store from '../../redux/store/store';
import Button from '../../ui/Button/Button';

// import Pindrop from './Pindrop/Pindrop';
import './Maps.css';
import axios from 'axios';
const partner = require('../../img/mapImg/pickuppoint.png');

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


        //showing of my direction
        const { showMyDirection, myDirection } = this.props.nav
        // console.log("New Direction Data is:", showMyDirection, myDirection.directionData);
        // console.log("Direction on  Show is:", this.state.directionsOnShow);

        if (
            showMyDirection !== prevProps.nav.showMyDirection
            && showMyDirection
        ) {
            console.log("My direction vitra xu hai ma");
            console.log("New Direction in side the div Data is:", showMyDirection, myDirection.directionData);
            this.resetState();
            this.setState({
                directionsOnShow: myDirection.directionData
            });
        }

        if (
            showMyDirection !== prevProps.nav.showMyDirection
            && !showMyDirection
        ) {
            console.log("My direction vitra xu hai ma");
            console.log("New Direction in side the div Data is:", showMyDirection, myDirection.directionData);
            this.resetState();
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
            //     waypoints: [
            //         {
            //            location: new window.google.maps.LatLng(28.2183958, 83.98375250000004)
            //         },
            //         {
            //            location: new window.google.maps.LatLng(28.2083132,83.99896179999996)
            //         }
            //    ]
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
                store.dispatch({ type: 'SET_HAVEI_REGISTERED', payload: true })
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

    handleDoneLocation = () => {
        store.dispatch({
            type: 'SET_SHOW_HIM',
            payload: false
        })
    }



    render() {
        // console.log("State of the app: ", this.state);
        // console.log("Steate of show my direction:", this.props.nav.showMyDirection)

        let dialogMessage, content;
        if (this.state.progress === 'continuing') {
            dialogMessage = 'Wanna share with this route?';
            content = (
                <Auxi>
                    <button onClick={this.onYesHandler}>Yes</button>
                    <button onClick={this.onoHandler}>No</button>
                </Auxi>
            );
        }

        var hisMarker = new window.google.maps.MarkerImage(
            "https://pbs.twimg.com/media/EAfYZi9VUAAqWKF?format=png",
            null, /* size is determined at runtime */
            null, /* origin is 0,0 */
            null, /* anchor is bottom center of the scaled image */
            new window.google.maps.Size(145, 84)
        )
        var myMarker = new window.google.maps.MarkerImage(
            "https://i.ibb.co/R44LD9K/my-Location-1.png",
            null, /* size is determined at runtime */
            null, /* origin is 0,0 */
            null, /* anchor is bottom center of the scaled image */
            new window.google.maps.Size(88, 88)
        )



        const { hisLocation, showHisLocation, hisStatus } = this.props.nav;
        const { acceptedTo, acceptedBy, haveIRegistered } = this.props.bell;
        const isShared = acceptedBy || acceptedTo;
        // console.log('We got the output like this', hisLocation, showHisLocation, hisStatus);

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
                    {this.state.directionsOnShow && (
                        <div>
                            <DirectionsRenderer
                                options={{
                                    polylineOptions: {
                                        strokeOpacity: 1,
                                        strokeColor: 'orangered',
                                        strokeWeight: 5, 
                                    },
                                    
                                }}
                                directions={this.state.directionsOnShow}
                            />
                            {Object.keys(this.props.nav.hisDirection).length > 0
                                ? <DirectionsRenderer
                                
                                    options={{
                                        polylineOptions: {
                                            strokeOpacity: 0.7,
                                            strokeColor: '#53d018',
                                            strokeWeight: 8, 
                                        },
                                        markerOptions: {
                                            opacity: 0.6
                                        }

                                    }}
                                    directions={this.props.nav.hisDirection.directionData}
                                />
                                : null}


                        </div>
                    )}



                    {/*----------- Green Pickup point -----------*/}
                    {
                        (this.state.progress === null && !this.props.bell.responseProgress)
                            && !showHisLocation && !isShared && !haveIRegistered
                            ? (<div className="MapMarker">
                                <img
                                    onClick={this.onMarkerClickHandler}
                                    className="MapMarkerImage"
                                    src={require('../../img/mapImg/pick.svg')}
                                    alt=""
                                />
                            </div>)
                            : null}

                    {/*----------- Pink Drop point -----------*/}

                    {
                        (this.state.progress === 'pickupPointIsSet')
                            && !showHisLocation && !isShared && !haveIRegistered
                            ? (<div className="MapMarker">
                                <img
                                    onClick={this.onMarkerClickHandler}
                                    className="MapMarkerImage"
                                    src={require('../../img/mapImg/drop.svg')}
                                    alt=""
                                />
                            </div>)
                            : null}



                    {/*----------- PickUp point ko marker -----------*/}
                    {this.state.progress === 'pickupPointIsSet'
                        ? (<Marker
                            onClick={this.onPickupPointClickHandler}
                            position={{ lat: this.state.pickupPoint.lat, lng: this.state.pickupPoint.lng }}
                        >
                        </Marker>)
                        : null}

                    {/*----------- Drop point ko marker -----------*/}
                    {this.state.progress === 'pickupPointIsSet' || this.state.progress === 'dropPointIsSet'
                        ? (<Marker

                            onClick={this.onPickupPointClickHandler}
                            position={{ lat: this.state.dropPoint.lat, lng: this.state.dropPoint.lng }}
                        >
                        </Marker>)
                        : null}

                    {/*----------- Partner's location ko marker -----------*/}
                    {showHisLocation
                        ? (<Marker
                            icon={hisMarker}
                            position={hisLocation}
                        >
                        </Marker>)
                        : null}

                    {/*----------- My location golo point -----------*/}

                    {
                        isShared || haveIRegistered
                            ? (<Marker
                                icon={myMarker}
                                position={this.props.nav.realLocation}
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
                    Matching routes not found <br/> <br/>
                    <Button cls="Success InlineBtn" clicked={this.onDoneHandler}>Done</Button>
                    <Button  cls="Warning InlineBtn" clicked={this.onCancelAllHandler}>Cancel</Button>
                </Modal>


                {/*----------- Modal to complete the matching and all    --------------------------------------*/}

                <Modal
                    show={this.state.progress === 'almostComplete' || this.state.progress === 'noSelectedRoutes'} modalClosed={() => {
                        this.setState({ progress: 'null', loading: false });
                    }}
                    fromTop='27%'
                >
                You are about to be done. <br/> <br/>
                    <Button cls="Success InlineBtn"  clicked={this.onChooseAgainHandler}>Choose routes again</Button>
                    <br/><br/>
                    <Button cls="Success InlineBtn"  clicked={this.onDoneHandler}>Done</Button>
                    <Button cls="Warning InlineBtn"  clicked={this.onCancelAllHandler}>Cancel</Button>
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

                {/*----------- Partner's Location Bottom Dialog -----------*/}
                <DialogBottom
                    show={
                        this.props.nav.showHisLocation
                    }
                >
                    <HisLocation onLocate={this.props.onLocateClick} onDone={this.handleDoneLocation} />
                </DialogBottom>




            </Auxi >
        )
    }
}

Maps.propTypes = {
    bell: PropTypes.object.isRequired,
    nav: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    bell: state.bell,
    nav: state.nav
})



export default connect(mapStateToProps)(withScriptjs(withGoogleMap(Maps)));


// {/*-----------  -----------*/}
