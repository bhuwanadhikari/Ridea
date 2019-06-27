import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import store from '../redux/store/store';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';



const PublicRoute = ({ component: Component, auth,  ...rest }) => {

    const authState = store.getState().auth.isAuthenticated;

    return (
        <Route
            {...rest}
            render={props => (auth.isAuthenticated === false)
                ? (<Component {...props} />)
                : (<Redirect to='/home' />)
            }
        />
    )
}

PublicRoute.propTypes = {
    auth: PropTypes.object.isRequired,
 };


const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(mapStateToProps)(PublicRoute);
