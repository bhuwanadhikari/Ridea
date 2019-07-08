import { combineReducers } from 'redux';
import authReducer from './authReducer';
import routeManageReducer from './notificationReducer';

export default combineReducers({
    routeManager: routeManageReducer,
    auth: authReducer
})