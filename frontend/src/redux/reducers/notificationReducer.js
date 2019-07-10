
const initialState = {
    notifiedByRoutes: null,
    responseProgress: null,
    activeDirection: null,
    respondedRoutes: [],
    shared: {
        status: false,
        with: null
    }
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
     
        case 'SET_ACTIVE_DIRECTION':
            return {
                ...state,
                activeDirection: action.payload
            }
        case 'SET_RESPONDED_ROUTES':
            return {
                ...state,
                respondedRoutes: action.payload
            }
        case 'SET_SHARED':
            return {
                ...state,
                shared: {
                    ...state.shared,
                    status:action.payload.status,
                    with: action.payload.with
                }
            }
        default:
            return state;
    }
};