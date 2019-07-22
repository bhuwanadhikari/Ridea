import React, { Component } from 'react';
import Auxi from '../../../hoc/Auxi';


class AcceptReject extends Component {

    onAcceptHandler = () => {
        console.log("Accepted");
    }

    onRejectHandler = () => {
        console.log("Rejected");
    }

    goBackHandler = () => {
        console.log("Accepted");
    }

    render() {
        return (
            <Auxi>
                <button onClick={this.onContinueHandler}>Accept</button>
                <button onClick={this.onCancelAllHandler}>Reject</button>
                <button onClick={this.onCancelAllHandler}>Reject</button>
            </Auxi>
        )
    }
}

export default AcceptReject
