import React, {useContext} from 'react'
import axios from 'axios';
import './DrawerToggleButton.css';
import { NotificationProvider, NotificationContext } from '../../context/NotificationContext';

const DrawerToggleButton = () => {

    const [notification, setNotification] = useContext(NotificationContext)


    // componentDidMount() {
    //request for the notification of 
    //     axios
    //         .get('/api/notifications')
    //         .then((result) => {
    //             if (result.data.status === true) {
    //                 console.log("Notificaition status", result.data.status);
    //                 this.setState({
    //                     notification: true
    //                 })
    //             } else {
    //                 this.setState({
    //                     notification: false
    //                 })
    //             }
    //         }).catch((err) => {
    //             console.log(err);
    //         });
    // }



    let notifier = (
        <div className="Notifier"></div>
    )
    return (
        <NotificationProvider>
            <button className='ToggleButton' id='ToggleButton' onClick={() => console.log("hello world")}>
                {notification
                    ? (notifier)
                    : null}
                <div className='ToggleButtonLine'></div>
                <div className='ToggleButtonLine' ></div>
                <div className='ToggleButtonLine'></div>
            </button>
        </NotificationProvider>
    )
}

export default DrawerToggleButton;
