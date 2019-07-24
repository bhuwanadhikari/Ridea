import React, { Component } from 'react';
import Auxi from '../../hoc/Auxi';


class Notifications extends Component {

    componentDidMount() {

    }

    render() {
        var { notiArray } = this.props;
        // console.log('Notification array is', notiArray);

        if (notiArray.length > 0) {
            notiArray = notiArray.filter((el, ix) => {
                return (el.label === 'rejectedBy') || (el.label === 'requestedBy') || (el.label === 'acceptedBy')
            });
        }

        // console.log('Notification array is', notiArray);


        const ifNull = (<div className="OneActivity">
            No recent Notifications
            </div>)

        if (notiArray.length === 0) {
            return ifNull;
        } else {

            return (
                <Auxi>
                    {notiArray.map((item, index) => {
                        switch (item.label) {
                            case 'acceptedBy':
                                return (<div key={index} className="OneActivity">
                                    You are accepted by {item.name}
                                </div>)
                            case 'requestedBy':
                                return (<div key={index} className="OneActivity">
                                    You are requested by {item.name}
                                </div>)
                            case 'rejectedBy':
                                return (<div key={index} className="OneActivity">
                                    You are rejected by {item.name}
                                </div>)
                            default:
                                return null;
                        }
                    })}
                </Auxi>
            );
        }
    }
}



export default Notifications;