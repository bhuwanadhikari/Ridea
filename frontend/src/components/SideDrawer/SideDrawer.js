import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import Aux from '../../hoc/Auxi';
import BackDrop from '../../ui/BackDrop/BackDrop';
import Modal from '../../ui/Modal/Modal';
import Notifications from '../../containers/Notifications.js/Notifications';
import store from '../../redux/store/store';
import setAuthToken from '../../utils/setAuthToken';
import home from '../../img/SidebarImg/home.svg';
import notification from '../../img/SidebarImg/notification.svg';
import feedback from '../../img/SidebarImg/feedback.svg';
import routeIcon from '../../img/SidebarImg/routeIcon.png';
import './SideDrawer.css';

class SideDrawer extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            showNotificationsModal: false,
        }
    }


    componentDidMount() {
        axios
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
    }

    onNotificationClickHandler = () => {
        
        this.setState({ showNotificationsModal: true });
        store.dispatch({
            type: 'SET_RESPONSE_PROGRESS',
            payload: 'REQUEST_HANGING'
        })
        this.props.drawerClosed();

    }

    onModalCloseHandler = () => {
        if (!this.state.showNotificationsModal) {
            return;
        }
        this.setState({ showNotificationsModal: false });
        store.dispatch({
            type: 'SET_RESPONSE_PROGRESS',
            payload: 'NOTIFIEDBY_IS_FETCHED'
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


    render() {
        
        setInterval(()=> {
            console.log("=+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
        }, 5000);

        console.log(this.state.showNotificationsModal, 'ist the state of notification modal')

        let { show } = this.props;
        var notifiedBy = this.props.bell.notifiedByRoutes;

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
                                Notification{notifiedBy && `(${notifiedBy.length})`}
                            </div>
                        </div>

                        <div className="ListWrapper">
                            <img className="ListImg" src={routeIcon} alt="Ridea Feedback" />
                            <div className="LabelWrapper">
                                My Route
                            </div>
                        </div>

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
                        onClick = { () => {
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
                    <Notifications notificationData={notifiedBy} setNotificationModal={this.setNotificationModal} />
                </Modal>

            </Aux>
        )

    }
}

SideDrawer.propTypes = {
    bell: PropTypes.object
};

const mapStateToProps = state => ({
    bell: state.bell
});


export default connect(mapStateToProps)(SideDrawer);
