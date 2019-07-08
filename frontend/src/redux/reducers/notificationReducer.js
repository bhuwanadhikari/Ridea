
const initialState = {
    notifiedByRoutes: null,
    responseProgress: null
};

export default function (state = initialState, action) {
    console.log("login reducer has been hit");
    switch (action.type) {
        case 'SET_RESPONSE_PROGRESS':
            return {
                ...state,
                responseProgress: action.payload
            }
        case 'SET_NOTIFIEDBY_ROUTES':
            return {
                ...state,
                notifiedByRoutes: action.payload
            }
        default:
            return state;
    }
};