
const initialState = {
    showChat: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'SET_CHAT':
            return {
                ...state,
                showChat: action.payload
            }
        default:
            return state;
    }
};