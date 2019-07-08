import React, { useState, createContext} from 'react';

export const NotificationContext = createContext();


export const NotificationProvider = (props) => {
    const [notification, setNotification] = useState(false);
    return (
        <NotificationContext.Provider value = {[notification, setNotification]}>
            {props.children}
        </NotificationContext.Provider>
    )
}