import React from 'react'
import axios from 'axios';
import './DrawerToggleButton.css';

class DrawerToggleButton extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            notification: false
        }
    }
    componentDidMount() {
        //request for the notification of the user
        axios
            .get('/api/notifications')
            .then((result) => {
                if (result.data.status === true) {
                    console.log("Notificaition status", result.data.status);
                    this.setState({
                        notification: true
                    })
                } else {
                    this.setState({
                        notification: false
                    })
                }
            }).catch((err) => {
                console.log(err);
            });
    }

    render() {

        let notifier = (
            <div className="Notifier"></div>
        )
        return (
            <button className='ToggleButton' id='ToggleButton' onClick={this.props.clicked}>
                {this.state.notification
                    ? (notifier)
                    : null}
                <div className='ToggleButtonLine'></div>
                <div className='ToggleButtonLine' ></div>
                <div className='ToggleButtonLine'></div>
            </button>)
    }
}

export default DrawerToggleButton;
