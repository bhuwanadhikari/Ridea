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
import routeIcon from '../../img/SidebarImg/routeIcon.png';
import requestsIcon from '../../img/SidebarImg/requestsIcon.png';
import { poleData } from '../../redux/actions/action';
import Activities from '../../containers/Activities/Activities';
import Notifications from '../../containers/Notifications/Notifications';
import './SideDrawer.css';

class SideDrawer extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            showRequestsModal: false,
            showActivities: false,
            showNotifications: false,
            loading: false,
            activityArray: []
        }
    }


    componentDidMount() {
        const { name } = this.props.auth.user;
        window.document.title = name;
        this.props.poleData();

        this.timer = setInterval(() => {
            this.props.poleData();
        }, 5000);
    }

    componentWillUnmount() {
        this.timer = null;
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


    onActivitiesCloseHandler = (e) => {
        this.setState({ showActivities: false })
    }
    onNotiCloseHandler = (e) => {
        this.setState({showNotifications: false});
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



    render() {

        console.log("Activity array is now ", this.state.activityArray);

        var { requestedBy, requestedByPopulated, rejectedBy, requestedTo, rejectedTo } = this.props.bell;

        if (requestedBy.length !== requestedByPopulated.length) {
            this.onModalCloseHandler();
        }



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
                            onClick={this.onActivitiesClickHandler}
                        >
                            <img className="ListImg" src={requestsIcon} alt="Ridea Feedback" />
                            <div className="LabelWrapper">
                                Activities <span className="SideDrawerSpan">({`${requestedTo.length},${rejectedTo.length}`})</span>
                            </div>
                        </div>

                        <div className="ListWrapper"
                            onClick={this.onNotiClickHandler}
                        >
                            <img className="ListImg" src={requestsIcon} alt="Ridea Feedback" />
                            <div className="LabelWrapper">
                                Notifications <span className="SideDrawerSpan">({`${requestedBy.length},${rejectedBy.length}`})</span>
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
                                localStorage.removeItem('jwtToken');
                                setAuthToken(false);
                                //reset the whole store
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
                        setNotificationModal={this.setNotificationModal}
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

                

            </Aux>
        )

    }
}

SideDrawer.propTypes = {
    bell: PropTypes.object,
    auth: PropTypes.object.isRequired,
    poleData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    bell: state.bell,
    auth: state.auth
});


export default connect(mapStateToProps, { poleData })(SideDrawer);
