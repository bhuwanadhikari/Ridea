
const initialState = {
    showChat: false,
    realLocation: {}
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
        default:
            return state;
    }
};