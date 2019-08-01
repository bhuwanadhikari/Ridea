
const initialState = {
    showChat: false,
    realLocation: {},

    showMyDirection: false,
    myDirection: {},
    hisDirection: {},

    showHisLocation: false,
    hisStatus: 'Offline',
    hisLocation: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'SET_CHAT':
            return {
                ...state,
                showChat: action.payload
            }
        case 'SET_LOCATION':
            return {
                ...state,
                realLocation: action.payload
            }
        case 'SET_SHOW_HIM':
            return {
                ...state,
                showHisLocation: action.payload
            }

        case 'SET_HIS_LOCATION':
            return {
                ...state,
                hisLocation: action.payload
            }

        case 'SET_HIS_STATUS':
            return {
                ...state,
                hisStatus: action.payload
            }

        case 'SET_SHOW_MY_DIRECTION':
            return {
                ...state,
                showMyDirection: action.payload
            }
        case 'SET_MY_DIRECTION':
            return {
                ...state,
                myDirection: action.payload
            }

        case 'SET_HIS_DIRECTION':
            return {
                ...state,
                hisDirection: action.payload
            }


        case 'RESET_NAV':
            return initialState
        default:
            return state;
    }
};