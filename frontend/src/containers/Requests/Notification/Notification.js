import React, { Component } from 'react'

const Notification = ({ notifier }) => {
    let i = 1;
    return (
        <div className="NotificationWrapper">
            <div className="SN">{i++}</div>
            <div className="Name">{notifier.name}</div>
            <div className="View">Show Route</div>
        </div>
    )
}


export default Notification
