import React, { Component } from 'react'
import PropTypes from 'prop-types';
import store from '../../redux/store/store';
import './Notifications.css';
import { connect } from 'react-redux';

class Notifications extends Component {

  onShowRouteHandler = () => {
    store.dispatch({
      type: 'SET_RESPONSE_PROGRESS',
      payload: 'requestIsShowing'
    })
  }

  render() {

    const { notificationData } = this.props;
    return (
      <div className="NotificationsContainer">
        {
          notificationData && notificationData.map((item, index) => {
            return (
              <div className="NotificationWrapper" key={index}>
                <div className="SN">{index + 1}</div>
                <div className="Name">{item.name}</div>
                <div className="View"
                  onClick={this.onShowRouteHandler}
                >
                  Show Route
                </div>
              </div>
            )
          })
        }
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
