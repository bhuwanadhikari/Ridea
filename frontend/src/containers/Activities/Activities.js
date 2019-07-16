import React, { Component } from 'react';
import { connect } from 'react-redux';
import Auxi from '../../hoc/Auxi';


class Requests extends Component {

    componentDidMount() {

    }

    render() {
        const { activityArray } = this.props;
        return (
            <Auxi>
                {activityArray.map((item, index) => {
                    switch (item.label) {
                        case 'rejectedTo':
                            return (<div key = {index} className="OneActivity">
                                You rejected to {item.name}
                            </div>)
                        case 'rejectedBy':
                            return (<div key = {index} className="OneActivity">
                                You are rejected by {item.name}
                            </div>)
                        case 'requestedTo':
                            return (<div key = {index} className="OneActivity">
                                You requested to {item.name}
                            </div>)
                        case 'requestedBy':
                            return (<div key = {index} className="OneActivity">
                                You are requested by {item.name}
                            </div>)
                        default:
                            return (<div key = {index} className="OneActivity">
                                No recent activities.
                            </div>)
                    }
                })}
            </Auxi>
        );
    }
}



export default Requests;