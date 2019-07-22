import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';

export const NotificationContext = createContext();


export const NotificationProvider = (props) => {
    const [notification, setNotification] = useState(false);
    const [notifiedBy, setNotifiedBy] = useState();


    /* useEffect(() => {
        axios
            .get('/api/notifications/status')
            .then((result) => {
                if (result.data.status === true) {
                    console.log("Notificaition status", result.data.status);
                    setNotification(true)
                } else {
                    setNotification(false)
                }
            }).catch((err) => {
                console.log(err);
            });

        axios
            .get('/api/notifications/notified-by')
            .then((notifiedBy) => {
                setNotifiedBy(notifiedBy.data);
            }).catch((err) => {
                console.log(err);
            });
    }, []) */

    return (
        <NotificationContext.Provider value={{
            notification, setNotification,
            notifiedBy, setNotifiedBy
        }}>
            {props.children}
        </NotificationContext.Provider>
    )
}