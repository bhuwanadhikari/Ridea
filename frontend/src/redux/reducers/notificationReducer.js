
const initialState = {
    showBellSign: false,
    notifiedByRoutes: null,
    responseProgress: null
};

export default function (state = initialState, action) {
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
        case 'SET_BELL_SIGN':
            return {
                ...state,
                showBellSign: action.payload
            }
        default:
            return state;
    }
};