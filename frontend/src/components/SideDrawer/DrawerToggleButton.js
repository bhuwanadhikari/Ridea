import React, { useContext } from 'react'
import axios from 'axios';
import { NotificationContext } from '../../context/NotificationContext';
import './DrawerToggleButton.css';
const DrawerToggleButton = (props) => {

    const {notification, setNotification} = useContext(NotificationContext);


    console.log(notification);

    let notifier = (
        <div className="Notifier"></div>
    )
    return (
        <button className='ToggleButton' id='ToggleButton' onClick={props.clicked}>
            {notification
                ? notifier
                : null}

            <div className='ToggleButtonLine'></div>
            <div className='ToggleButtonLine' ></div>
            <div className='ToggleButtonLine'></div>
        </button>
    )
}

export default DrawerToggleButton;
