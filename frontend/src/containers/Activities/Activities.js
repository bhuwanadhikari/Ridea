import React, { Component } from 'react';
import Auxi from '../../hoc/Auxi';


class Requests extends Component {

    componentDidMount() {

    }

    render() {
        var { activityArray } = this.props;

        if (activityArray.length > 0) {
            activityArray = activityArray.filter((el, ix) => {
                return (el.label === 'acceptedTo') || (el.label === 'rejectedTo') || (el.label === 'requestedTo');
            });
        }



        const ifNull = (<div className="OneActivity">
            No recent Activities
            </div>)

        if (activityArray.length === 0) {
            return ifNull;
        }

        return (
            <Auxi>
                {activityArray.map((item, index) => {
                    switch (item.label) {
                        case 'acceptedTo':
                            return (<div key={index} className="OneActivity">
                                You accepted {item.name}
                            </div>)
                        case 'rejectedTo':
                            return (<div key={index} className="OneActivity">
                                You rejected to {item.name}
                            </div>)
                        case 'requestedTo':
                            return (<div key={index} className="OneActivity">
                                You requested to {item.name}
                            </div>)
                        default:
                            return (<div key={index} className="OneActivity">
                                No recent activities.
                            </div>)
                    }
                })}
            </Auxi>
        );
    }
}



export default Requests;