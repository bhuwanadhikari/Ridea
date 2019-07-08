import React, { Component } from 'react'
import Notification from './Notification/Notification';
import './Notifications.css';

const Notifications = ({ notificationData }) => {
  return (
    <div className="NotificationsContainer">
      {notificationData && notificationData.map((item, index) => {
        return (
          <div className="NotificationWrapper">
            <div className="SN">{index+1}</div>
            <div className="Name">{item.name}</div>
            <div className="View">Show Route</div>
          </div>
        )
      })
      }
    </div>

  )

}

export default Notifications
