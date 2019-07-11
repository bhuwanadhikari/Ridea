
const initialState = {
    requestedTo: [],
    requestedBy: [],

    acceptedTo: null,
    acceptedBy: null,

    rejectedTo: [],
    rejectedBy: [],

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
        case 'SET_REQUESTEDTO_ROUTES':
            return { ...state, notifiedByRoutes: action.payload }
        case 'SET_REQUESTEDBY_ROUTES':
            return { ...state, notifiedByRoutes: action.payload }


            
        case 'SET_ACCEPTEDTO_ROUTES':
            return { ...state, notifiedByRoutes: action.payload }
        case 'SET_ACCEPTEDBY_ROUTES':
            return { ...state, notifiedByRoutes: action.payload }


        case 'SET_REJECTEDTO_ROUTES':
            return { ...state, notifiedByRoutes: action.payload }
        case 'SET_REJECTEDBY_ROUTES':
            return { ...state, notifiedByRoutes: action.payload }



        case 'SET_ACTIVE_DIRECTION':
            return { ...state, activeDirection: action.payload }
        case 'SET_RESPONDED_ROUTES':
            return { ...state, respondedRoutes: action.payload }
        case 'SET_SHARED':
            return {
                ...state,
                shared: {
                    ...state.shared,
                    status: action.payload.status,
                    with: action.payload.with
                }
            }
        default:
            return state;
    }
};