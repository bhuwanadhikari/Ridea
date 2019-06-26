import isEmpty from '../../validation/isEmpty';

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default function (state = initialState, action) {
    console.log("login reducer has been hit");
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        default:
            return state;
    }
};