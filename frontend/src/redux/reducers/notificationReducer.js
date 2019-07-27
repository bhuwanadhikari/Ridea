
const initialState = {
    requestedTo: [],
    requestedBy: [],

    acceptedTo: null,
    acceptedBy: null,

    rejectedTo: [],
    rejectedBy: [],

    bufferData: [],
    requestedByPopulated: [],
    activityData: [],

    responseProgress: null,
    activeDirection: null,
    respondedRoutes: [],

    haveIRegistered: false,

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
        case 'SET_REQUESTEDTO':
            return { ...state, requestedTo: action.payload }
        case 'SET_REQUESTEDBY':
            return { ...state, requestedBy: action.payload }



        case 'SET_ACCEPTEDTO':
            return { ...state, acceptedTo: action.payload }
        case 'SET_ACCEPTEDBY':
            return { ...state, acceptedBy: action.payload }


        case 'SET_REJECTEDTO':
            return { ...state, rejectedTo: action.payload }
        case 'SET_REJECTEDBY':
            return { ...state, rejectedBy: action.payload }


        case 'SET_BUFFER_DATA':
            return { ...state, bufferData: action.payload }


        case 'SET_REQBY_POPULATED':
            return { ...state, requestedByPopulated: action.payload }
        case 'SET_ACTIVITY_DATA':
            return { ...state, activityData: action.payload }

        case 'SET_ACTIVE_DIRECTION':
            return { ...state, activeDirection: action.payload }
        case 'SET_RESPONDED_ROUTES':
            return { ...state, respondedRoutes: action.payload }

        case 'SET_HAVEI_REGISTERED':
            return {...state, haveIRegistered: action.payload}

        case 'SET_SHARED':
            return {
                ...state,
                shared: {
                    ...state.shared,
                    status: action.payload.status,
                    with: action.payload.with
                }
            }


        case 'RESET_BELL':
            return initialState
        default:
            return state;
    }
};