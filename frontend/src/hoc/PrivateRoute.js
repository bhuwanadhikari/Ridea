import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import store from '../redux/store/store';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, auth, ...rest }) => {

    const authState = store.getState().auth.isAuthenticated;

    if (Object.keys(store.getState().auth.user.length === 0)) {
        window.document.title = store.getState().auth.user.name;
    }

    return (
        <Route
            {...rest}
            render={props => {
                return (
                    (authState === true)
                        ? <Component {...props} />
                        : <Redirect to='/' />
                )
            }}
        />
    )
};


PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
