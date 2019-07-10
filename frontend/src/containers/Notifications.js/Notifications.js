import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';
import store from '../../redux/store/store';
import Toast from '../../ui/Toast/Toast';
import { getMyData } from '../../redux/actions/action';
import './Notifications.css';
import { connect } from 'react-redux';
import { ToastsContainer, ToastsStore } from 'react-toasts';


class Notifications extends Component {

  onShowRouteHandler = (index) => {
    store.dispatch({
      type: 'SET_RESPONSE_PROGRESS',
      payload: 'REQUEST_IS_SHOWING'
    })

    store.dispatch({
      type: 'SET_ACTIVE_DIRECTION',
      payload: this.props.bell.notifiedByRoutes[index]
    })

    this.props.setNotificationModal(false);

  }

  onCancelHandler = () => {
    store.dispatch({
      type: 'SET_RESPONSE_PROGRESS',
      payload: 'NOTIFIEDBY_IS_FETCHED'
    })
    store.dispatch({
      type: 'SET_ACTIVE_DIRECTION',
      payload: null
    })
    store.dispatch({
      type: 'SET_RESPONDED_ROUTES',
      payload: []
    })
  }

  onSubmitHandler = async () => {
    //post to backend
    console.log("Submit has been clicked")
    const { respondedRoutes } = this.props.bell;
    if (respondedRoutes.length > 0) {
      await axios
        .post('/api/notifications/respond-notification', { respondedRoutes })
        .then((result) => {
          console.log("Output of the submit is:", result.data);
          store.dispatch({
            type: 'SET_RESPONSE_PROGRESS',
            payload: 'NOTIFIEDBY_IS_FETCHED'
          })
          store.dispatch({
            type: 'SET_ACTIVE_DIRECTION',
            payload: null
          })
          store.dispatch({
            type: 'SET_RESPONDED_ROUTES',
            payload: []
          })
        }).catch((err) => {
          console.log(err);
        });

      await this.props.getMyData();
      if (respondedRoutes.find(el => el.responseStatus === 'Accepted')) {
        ToastsStore.success("Visit chat page to chat with Ride Partner")
      }

    } else {
      store.dispatch({
        type: 'SET_RESPONSE_PROGRESS',
        payload: 'NOTIFIEDBY_IS_FETCHED'
      })
      store.dispatch({
        type: 'SET_ACTIVE_DIRECTION',
        payload: null
      })
      store.dispatch({
        type: 'SET_RESPONDED_ROUTES',
        payload: []
      })
      ToastsStore.success("Nothing is submitted");
    }
  }

  render() {

    const { respondedRoutes, activeDirection } = this.props.bell;

    const { notificationData } = this.props;
    return (
      <div className="NotificationsContainer">
        {
          notificationData && notificationData.map((item, index) => {
            console.log("REsonses sateatu sof the itemi is", item.responseStatus);
            let stateOfRequest = "Pending";
            var bufferRoute = respondedRoutes.find(aRoute => aRoute.user_id === item.user_id)
            if (bufferRoute) {
              if (bufferRoute.responseStatus === 'Accepted') {
                stateOfRequest = 'Accepted';
              }
              if (bufferRoute.responseStatus === 'Rejected') {
                stateOfRequest = "Rejected"
              }
            }
            return (
              <div className="NotificationWrapper" key={index}>
                <div className="SN">{stateOfRequest}</div>
                <div className="Name">{item.name}</div>
                <div className="View"
                  onClick={() => this.onShowRouteHandler(index)}
                >
                  Show Route
                </div>
              </div>
            )
          })
        }

        <div className="BellFooter">
          <button onClick={this.onSubmitHandler}>Submit </button>
          <ToastsContainer store={ToastsStore} lightBackground />


          <button onClick={this.onCancelHandler}>Cancel </button>
        </div>
      </div>

    )
  }

}

Notifications.propTypes = {
  bell: PropTypes.object.isRequired,
  getMyData: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  bell: state.bell
})

export default connect(mapStateToProps, {getMyData})(Notifications);
