
const initialState = {
    showChat: false,
    realLocation: {},
    showPalLocation: false,
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
        case 'SET_SHOW_PAL':
            return {
                ...state,
                showPalLocation: action.payload
            }
        default:
            return state;
    }
};