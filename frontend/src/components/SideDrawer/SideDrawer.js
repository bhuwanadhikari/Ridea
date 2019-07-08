import React, { useContext, useState, useEffect } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Aux from '../../hoc/Auxi';
import BackDrop from '../../ui/BackDrop/BackDrop';
import Modal from '../../ui/Modal/Modal';
import Notifications from '../../containers/Notifications.js/Notifications';
import store from '../../redux/store/store';
import './SideDrawer.css';
import home from '../../img/SidebarImg/home.svg';
import notification from '../../img/SidebarImg/notification.svg';
import feedback from '../../img/SidebarImg/feedback.svg';
import { NotificationContext } from '../../context/NotificationContext';

const SideDrawer = (props) => {
    const { notifiedBy } = useContext(NotificationContext);

    const [notificationsModal, setNotificationsModal] = useState(false);

    let { show } = props;
    const onNotificationClickHandler = () => {
        if (notificationsModal) {
            return;
        }
        setNotificationsModal(true);
        props.drawerClosed();

    }

    const onModalCloseHandler = () => {
        if (!notificationsModal) {
            return;
        }
        setNotificationsModal(false);
    }

    useEffect(() => {
        return () => {
            console.log("SET_NOTIFIEDBY_ROUTES has been hit");
            store.dispatch({
                type: 'SET_NOTIFIEDBY_ROUTES',
                payload: { ...notifiedBy }
            });
            store.dispatch({
                type: 'SET_RESPONSE_PROGRESS',
                payload: 'notifiedByIsSet'
            });

        };
    });


    console.log("Show sideDrawer:", show);
    return (
        <Aux>
            <BackDrop show={show} clicked={props.drawerClosed} />
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
                        onClick={onNotificationClickHandler}
                    >
                        <img className="ListImg" src={notification} alt="Ridea Notification" />
                        <div className="LabelWrapper">
                            Notification{notifiedBy && `(${notifiedBy.length})`}
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

                    <div className="ListWrapper">
                        <div className="LabelWrapper">
                            Logout
                            </div>
                    </div>

                </div>
            </div>



            {/*----------- Show Notification Boxes   --------------------------------------*/}

            <Modal
                show={notificationsModal} modalClosed={onModalCloseHandler}
                fromTop='27%'
            >
                <div className="NotificationsContainer">
                    {
                        notifiedBy && notifiedBy.map((item, index) => {
                            return (
                                <div className="NotificationWrapper">
                                    <div className="SN">{index + 1}</div>
                                    <div className="Name">{item.name}</div>
                                    <div className="View"
                                        onClick={onModalCloseHandler}
                                    >
                                        Show Route
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </Modal>

        </Aux>
    )

}

SideDrawer.propTypes = {
    routeManage: PropTypes.object
};

const mapStateToProps = state => ({
    routeManage: state.routeManage
});


export default connect(mapStateToProps)(SideDrawer);
