import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Auxi from '../../hoc/Auxi';
import store from '../../redux/store/store';

class AcceptReject extends Component {

    onAcceptHandler = () => {
        var { respondedRoutes, activeDirection, requestedByPopulated } = this.props.bell;
        respondedRoutes = respondedRoutes.filter(aRoute => aRoute.owner !== activeDirection.owner);
        respondedRoutes = respondedRoutes.filter(aRoute => aRoute.responseStatus != 'Accepted');

        var tempArray = requestedByPopulated.filter(route => route.owner !== activeDirection.owner);
        tempArray.forEach(el => {
            el.responseStatus = "Rejected";
        });
        activeDirection.responseStatus = 'Accepted';
        respondedRoutes.push(activeDirection);
        respondedRoutes = [...respondedRoutes, ...tempArray];
        respondedRoutes = respondedRoutes.filter((respondedRoute, index) => respondedRoutes.indexOf(respondedRoute) === index);



        store.dispatch({
            type: 'SET_RESPONDED_ROUTES',
            payload: respondedRoutes,
        });
        store.dispatch({
            type: 'SET_RESPONSE_PROGRESS',
            payload: 'REQUEST_HANGING'
        });




    };

    onRejectHandler = () => {
        var { respondedRoutes, activeDirection } = this.props.bell;

        respondedRoutes = respondedRoutes.filter(aRoute => aRoute.owner !== activeDirection.owner);

        activeDirection.responseStatus = 'Rejected';
        respondedRoutes.push(activeDirection);
        store.dispatch({
            type: 'SET_RESPONDED_ROUTES',
            payload: respondedRoutes,
        });

        store.dispatch({
            type: 'SET_RESPONSE_PROGRESS',
            payload: 'REQUEST_HANGING'
        });

    };

    onGoBackHandler = () => {
        store.dispatch({
            type: 'SET_RESPONSE_PROGRESS',
            payload: 'REQUEST_HANGING'
        });
    };

    render() {
        return (
            <Auxi>
                <button onClick={this.onAcceptHandler}>Accept</button>
                <button onClick={this.onRejectHandler}>Reject</button>
                <button onClick={this.onGoBackHandler}>Go Back</button>
            </Auxi>
        );
    }
}

AcceptReject.propTypes = {

};

const mapStateToProps = state => ({
    bell: state.bell
})

export default connect(mapStateToProps)(AcceptReject);