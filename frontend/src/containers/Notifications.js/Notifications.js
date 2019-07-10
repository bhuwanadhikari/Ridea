import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';
import store from '../../redux/store/store';
import './Notifications.css';
import { connect } from 'react-redux';
import Axios from 'axios';

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

  onSubmitHandler = () => {
    //post to backend
    console.log("Submit has been clicked")
    // const { respondedRoutes } = this.props.bell;
    // axios
    //   .post('/api/notifications/respond-notification', { respondedRoutes })
    //   .then((result) => {
    //     console.log("Output of the submit is:", result.data);
    //     store.dispatch({
    //       type: 'SET_RESPONSE_PROGRESS',
    //       payload: 'NOTIFIEDBY_IS_FETCHED'
    //     })
    //     store.dispatch({
    //       type: 'SET_ACTIVE_DIRECTION',
    //       payload: null
    //     })
    //     store.dispatch({
    //       type: 'SET_RESPONDED_ROUTES',
    //       payload: []
    //     })
    //   }).catch((err) => {
    //     console.log(err);
    //   });
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
          <button onClick={this.onCancelHandler}>Cancel </button>
        </div>
      </div>

    )
  }

}

Notifications.propTypes = {
  bell: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  bell: state.bell
})

export default connect(mapStateToProps)(Notifications);
