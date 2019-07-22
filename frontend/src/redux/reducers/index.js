import { combineReducers } from 'redux';
import authReducer from './authReducer';
import notificationReducer from './notificationReducer';
import navReducer from './navReducer';


export default combineReducers({
    bell: notificationReducer,
    auth: authReducer,
    nav: navReducer
})