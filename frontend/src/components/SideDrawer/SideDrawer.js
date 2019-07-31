import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import Aux from '../../hoc/Auxi';
import BackDrop from '../../ui/BackDrop/BackDrop';
import Modal from '../../ui/Modal/Modal';
import Requests from '../../containers/Requests/Requests';
import store from '../../redux/store/store';
import setAuthToken from '../../utils/setAuthToken';
import home from '../../img/SidebarImg/home.svg';
import notification from '../../img/SidebarImg/notification.svg';
import feedback from '../../img/SidebarImg/feedback.svg';
import timeline from '../../img/SidebarImg/timeline.svg';
import routeIcon from '../../img/SidebarImg/routeIcon.png';
import leftArrow from '../../img/left-arrow.svg'
import user from '../../img/user.svg'
import more from '../../img/more.svg'
import requestsIcon from '../../img/SidebarImg/requestsIcon.png';
import { poleData } from '../../redux/actions/action';
import Activities from '../../containers/Activities/Activities';
import Notifications from '../../containers/Notifications/Notifications';
import EditProfile from './EditProfile';
import { logout } from '../../redux/actions/action';
import DialogBottom from '../../ui/DialogBottom/DialogBottom';
import './SideDrawer.css';

class SideDrawer extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            showRequestsModal: false,
            showActivities: false,
            showNotifications: false,
            showEditProfile: false,
            loading: false,
            activityArray: [],
            myName: ''
        }
    }


    componentDidMount() {


        axios
            .get('/api/users/my-data')
            .then((result) => {
                this.setState({ myName: result.data.name });
                window.document.title = result.data.name;

            }).catch((err) => {
                console.log('error in getting my data in sidedrwawred', err)
            });

        axios
            .get('/api/directions/have-i')
            .then((result) => {
                console.log("Do I have registered any routes", result.data);
                store.dispatch({ type: 'SET_HAVEI_REGISTERED', payload: result.data.haveI })
            }).catch((err) => {
                console.log('Error in have-i', err.response.data)
            });



        // axios.get('/api/directions/route/5d3c98f45473682720aa139d')
        //     .then((result) => {
        //         const direction = result.data.directionData;
        //         const test = direction.routes[0].overview_path;
        //         // console.log("Length:", test.length);

        //         const dist = direction.routes;
        //         console.log("Route details is :", dist[0].legs[0].distance.value, 'meters');


        //         // for (let place of test) {
        //         //     console.log(`${place.lat},${place.lng}`);
        //         // }


        //     }).catch((err) => {
        //         console.log("Error found in getting route by Id", err)
        //     });


        this.props.poleData();
        this.locateMe();

        this.timer = setInterval(() => {
            this.props.poleData();
            this.locateMe();
        }, 15000);
    }

    componentWillUnmount() {
        this.timer = null;
    }


    handleMyRouteClick = () => {
        var cond = false;
        console.log("my route has been clicked");

        //get my own route
        axios
            .get('/api/directions/get-direction-by-owner')
            .then((result) => {
                console.log('Direction of mine is', result.data);
                store.dispatch({ type: 'SET_MY_DIRECTION', payload: result.data })
                store.dispatch({ type: 'SET_SHOW_MY_DIRECTION', payload: true });
            }).catch((err) => {
                console.log("Error occured:", err);
            });
        this.props.drawerClosed();
    }

    handleCloseMyDirectionClick = () => {
        console.log('Done has been clicke');
        store.dispatch({ type: 'SET_SHOW_MY_DIRECTION', payload: false });
        store.dispatch({ type: 'SET_MY_DIRECTION', payload: {} })
    }



    onRequestsClickHandler = () => {
        this.setState({ showRequestsModal: true, loading: true });

        axios
            .get('/api/notifications/requested-by')
            .then((res) => {
                console.log("Populated", res.data);
                this.setState((state, props) => { return { loading: false } })

                if (res.data.length > 0) {
                    store.dispatch({ type: 'SET_REQBY_POPULATED', payload: res.data });
                    store.dispatch({ type: 'SET_RESPONSE_PROGRESS', payload: 'REQUEST_HANGING' });
                } else {
                    alert("No requests found");
                }

            }).catch((err) => {
                console.log(err.response.data, 'in the /requested-by wala');
            });
        this.props.drawerClosed();
    }

    onActivitiesClickHandler = async () => {

        console.log('Activity has been clicked');
        this.setState((state, props) => {
            return {
                showActivities: true
            }
        });
        this.props.drawerClosed();
    };


    onNotiClickHandler = () => {

        console.log('Notifications has been clicked');
        this.setState((state, props) => {
            return {
                showNotifications: true
            }
        });
        this.props.drawerClosed();
    }

    onEditHandler = () => {

        console.log('edit profile has been clicked');
        this.setState((state, props) => {
            return {
                showEditProfile: true
            }
        });
        this.props.drawerClosed();
    }


    onActivitiesCloseHandler = (e) => {
        this.setState({ showActivities: false })
    }
    onNotiCloseHandler = (e) => {
        this.setState({ showNotifications: false });
    }
    onEditCloseHandler = (e) => {
        this.setState({ showEditProfile: false });
    }

    onModalCloseHandler = () => {
        if (!this.state.showRequestsModal) {
            return;
        }
        this.setState({ showRequestsModal: false });
        store.dispatch({
            type: 'SET_RESPONSE_PROGRESS',
            payload: 'REQUESTEDBY_IS_FETCHED'
        });

        store.dispatch({
            type: 'SET_ACTIVE_DIRECTION',
            payload: null
        })
    }


    setRequestsModal = (status) => {
        this.setState((state, props) => {
            return {
                showRequestsModal: status
            }
        })

    }

    updateName = (newName) => {
        this.setState({ myName: newName });
        window.document.title = newName;
    }

    locateMe = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const newLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                    store.dispatch({
                        type: 'SET_LOCATION',
                        payload: newLocation
                    })
                }
            );
        } else {
            console.log("Location cannot be updated");
        }
    }



    render() {

        // console.log("Activity array is now ", this.state.activityArray);

        var { requestedBy, requestedByPopulated, rejectedBy, requestedTo, rejectedTo } = this.props.bell;

        if (requestedBy.length !== requestedByPopulated.length) {
            this.onModalCloseHandler();
        }



        let { show } = this.props;
        const { name } = this.props.auth.user;


        return (
            <Aux>
                <BackDrop show={show} clicked={this.props.drawerClosed} />
                <div
                    className='SideDrawer'
                    style={{
                        transform: show ? 'translateX(0)' : 'translateX(-100vw)'
                    }}
                >
                    <div className="ProfileContainer1">
                        <div className="SideDrawerHeader1">
                            <img
                                src={leftArrow}
                                className='LeftArrow1'
                                alt=""
                                onClick={this.props.drawerClosed}
                            />
                            <img
                                src={more}
                                className="MoreIcon1"
                                alt="More icon for Ridea"
                                onClick={this.onEditHandler}
                            />
                        </div>
                        <div className="MainProfile1">
                            <img src={user} className="UserIcon1" alt="User icon for Ridea" />
                        </div>
                        <div className="ProfileName1">{this.state.myName}</div>
                    </div>
                    <div className="OptionsWrapper">

                        <div className="ListWrapper"
                            onClick={this.handleMyRouteClick}
                        >
                            <img className="ListImg" src={routeIcon} alt="Ridea Feedback" />
                            <div className="LabelWrapper">
                                My Route
                        </div>
                        </div>

                        <div className="ListWrapper"
                            onClick={this.onRequestsClickHandler}
                        >
                            <img className="ListImg" src={requestsIcon} alt="Ridea Notification" />
                            <div className="LabelWrapper">
                                Requests{requestedBy && `(${requestedBy.length})`}
                            </div>
                        </div>

                        <div className="ListWrapper"
                            onClick={this.onNotiClickHandler}
                        >
                            <img className="ListImg" src={notification} alt="Ridea Feedback" />
                            <div className="LabelWrapper">
                                Notifications {/* <span className="SideDrawerSpan">({`${requestedBy.length},${rejectedBy.length}`})</span> */}
                            </div>
                        </div>

                        <div className="ListWrapper"
                            onClick={this.onActivitiesClickHandler}
                        >
                            <img className="ListImg" src={timeline} alt="Ridea Feedback" />
                            <div className="LabelWrapper">
                                Activities {/* <span className="SideDrawerSpan">({`${requestedTo.length},${rejectedTo.length}`})</span> */}
                            </div>
                        </div>


                        {/*
                            this.state.showActivities &&
                            (
                                <div className="RequestsBody">
                                    <div className="RequestTitle">
                                        ROUTES YOU REQUESTED
                                    </div>
                                    <div className="RequestTitle">
                                        ROUTES YOU ARE REQUESTED BY
                                    </div>
                                    <div className="RequestTitle">
                                        ROUTES YOU REJECTED
                                    </div>
                                    <div className="RequestTitle">
                                        ROUTES YOU ARE REJECTED BY
                                    </div>
                                </div>
                            )
                            */}

                        <div className="ListWrapper">
                            <img className="ListImg" src={feedback} alt="Ridea Feedback" />
                            <div className="LabelWrapper">
                                Feedback
                            </div>
                        </div>

                        <div className="ListWrapper">
                            <div className="LabelWrapper">
                                About
                            </div>
                        </div>

                        <div className="ListWrapper">
                            <div className="LabelWrapper">
                                Privacy Policy
                            </div>
                        </div>

                        <div className="ListWrapper"
                            onClick={() => {
                                console.log('Logged oute');
                                this.props.logout();
                            }}
                        >
                            <div className="LabelWrapper">
                                Logout
                            </div>
                        </div>

                    </div>
                </div>



                {/*----------- Requests List Modal   --------------------------------------*/}

                <Modal
                    show={
                        this.props.bell.responseProgress === 'REQUEST_HANGING'
                    }
                    modalClosed={this.onModalCloseHandler}
                    fromTop='27%'
                >
                    <Requests
                        notificationData={requestedBy}
                        setRequestsModal={this.setRequestsModal}
                    />
                </Modal>

                {/*----------- Activities List Modal   --------------------------------------*/}
                <Modal
                    show={
                        this.state.showActivities
                    }
                    modalClosed={this.onActivitiesCloseHandler}
                    fromTop='27%'
                >
                    <Activities
                        activityArray={this.props.bell.activityData}
                    />
                </Modal>

                {/*----------- Notifications List Modal   --------------------------------------*/}
                <Modal
                    show={
                        this.state.showNotifications
                    }
                    modalClosed={this.onNotiCloseHandler}
                    fromTop='27%'
                >
                    <Notifications
                        notiArray={this.props.bell.activityData}
                    />
                </Modal>

                {/*----------- Update Name List Modal   --------------------------------------*/}
                <Modal
                    show={
                        this.state.showEditProfile
                    }
                    modalClosed={this.onEditCloseHandler}
                    fromTop='27%'
                >
                    <EditProfile onEditCloseHandler={this.onEditCloseHandler} updateName={this.updateName} />
                </Modal>

                {/*----------- My direction on show -----------*/}
                <DialogBottom
                    show={
                        this.props.nav.showMyDirection
                    }
                >{this.props.bell.acceptedBy || this.props.bell.acceptedTo
                    ? 'This is your combined route.'
                    : 'You have not shared your route yet.'
                    }
                    <button onClick={this.handleCloseMyDirectionClick} >

                        Done
                    </button>
                </DialogBottom>



            </Aux>
        )

    }
}

SideDrawer.propTypes = {
    bell: PropTypes.object,
    nav: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    poleData: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    bell: state.bell,
    auth: state.auth,
    nav: state.nav
});


export default connect(mapStateToProps, { poleData, logout })(SideDrawer);
