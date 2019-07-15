import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import Aux from '../../hoc/Auxi';
import BackDrop from '../../ui/BackDrop/BackDrop';
import Modal from '../../ui/Modal/Modal';
import Notifications from '../../containers/Requests/Requests';
import store from '../../redux/store/store';
import setAuthToken from '../../utils/setAuthToken';
import home from '../../img/SidebarImg/home.svg';
import notification from '../../img/SidebarImg/notification.svg';
import feedback from '../../img/SidebarImg/feedback.svg';
import routeIcon from '../../img/SidebarImg/routeIcon.png';
import requestsIcon from '../../img/SidebarImg/requestsIcon.png';
import { getMyData, poleData } from '../../redux/actions/action';
import Spinner from '../../ui/Spinnner/Spinner';
import './SideDrawer.css';

class SideDrawer extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            showNotificationsModal: false,
            showActivities: false,
            loading: false,
        }
    }


    componentDidMount() {
        const { name } = this.props.auth.user;
        console.log("Name of the user is ", name);
        window.document.title = name;
        /* axios
            .get('/api/notifications/status')
            .then((result) => {

                if (result.data.status === true) {
                    console.log("Notificaition status----------------------------------", result.data.status);
                    store.dispatch({
                        type: 'SET_BELL_SIGN',
                        payload: true
                    })
                } else {
                    store.dispatch({
                        type: 'SET_BELL_SIGN',
                        payload: false
                    })
                }
            }).catch((err) => {
                console.log(err);
            });

        axios
            .get('/api/notifications/notified-by')
            .then((notifiedBy) => {
                store.dispatch({
                    type: 'SET_NOTIFIEDBY_ROUTES',
                    payload: notifiedBy.data
                })
                store.dispatch({
                    type: 'SET_RESPONSE_PROGRESS',
                    payload: 'NOTIFIEDBY_IS_FETCHED'
                })
            }).catch((err) => {
                console.log(err);
            });
             */
        this.props.poleData();

        this.timer = setInterval(() => {
            this.props.poleData();
        }, 5000);
    }

    componentWillUnmount() {
        this.timer = null;
    }


    onNotificationClickHandler = () => {
        this.setState({ showNotificationsModal: true, loading: true });

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


    onModalCloseHandler = () => {
        if (!this.state.showNotificationsModal) {
            return;
        }
        this.setState({ showNotificationsModal: false });
        store.dispatch({
            type: 'SET_RESPONSE_PROGRESS',
            payload: 'REQUESTEDBY_IS_FETCHED'
        });

        store.dispatch({
            type: 'SET_ACTIVE_DIRECTION',
            payload: null
        })
    }

    setNotificationModal = (status) => {
        console.log(status, 'ist the state of notification modal')
        this.setState((state, props) => {
            return {
                showNotificationsModal: status
            }
        })

    }

    toggleRequestsHandler = () => {
        this.setState((state, props) => {
            return {
                showActivities: !state.showActivities
            }
        })

    }


    render() {

        var { requestedBy, requestedByPopulated, requestedTo, rejectedBy, rejectedTo } = this.props.bell;

        if (requestedBy.length !== requestedByPopulated.length) {
            this.onModalCloseHandler();
        }


        console.log(this.state.showNotificationsModal, 'ist the state of notification modal')

        let { show } = this.props;

        return (
            <Aux>
                <BackDrop show={show} clicked={this.props.drawerClosed} />
                <div
                    className='SideDrawer'
                    style={{
                        transform: show ? 'translateX(0)' : 'translateX(-100vw)'
                    }}
                >
                    <div className="ProfileContainer"></div>
                    <div className="OptionsWrapper">

                        <div className="ListWrapper">
                            <img className="ListImg" src={home} alt="Ridea Home" />
                            <div className="LabelWrapper">
                                Home
                            </div>
                        </div>

                        <div className="ListWrapper"
                            onClick={this.onNotificationClickHandler}
                        >
                            <img className="ListImg" src={notification} alt="Ridea Notification" />
                            <div className="LabelWrapper">
                                Requests{requestedBy && `(${requestedBy.length})`}
                            </div>
                        </div>

                        <div className="ListWrapper">
                            <img className="ListImg" src={routeIcon} alt="Ridea Feedback" />
                            <div className="LabelWrapper">
                                My Route
                            </div>
                        </div>

                        <div className="ListWrapper"
                            onClick={this.toggleRequestsHandler}
                        >
                            <img className="ListImg" src={requestsIcon} alt="Ridea Feedback" />
                            <div className="LabelWrapper">
                                Activities <span className="SideDrawerSpan">({`${requestedBy.length},${rejectedBy.length}`})</span>
                            </div>
                        </div>


                        {
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
                        }

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
                                localStorage.removeItem('jwtToken');
                                setAuthToken(false);
                                store.dispatch({
                                    type: 'SET_USER',
                                    payload: {}
                                });
                            }}
                        >
                            <div className="LabelWrapper">
                                Logout
                            </div>
                        </div>

                    </div>
                </div>



                {/*----------- Notifications List Modal   --------------------------------------*/}

                <Modal
                    show={
                        this.props.bell.responseProgress === 'REQUEST_HANGING'
                    }
                    modalClosed={this.onModalCloseHandler}
                    fromTop='27%'
                >
                    <Notifications notificationData={requestedBy} setNotificationModal={this.setNotificationModal} />
                </Modal>

            </Aux>
        )

    }
}

SideDrawer.propTypes = {
    bell: PropTypes.object,
    auth: PropTypes.object.isRequired,
    getMyData: PropTypes.func.isRequired,
    poleData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    bell: state.bell,
    auth: state.auth
});


export default connect(mapStateToProps, { getMyData, poleData })(SideDrawer);
