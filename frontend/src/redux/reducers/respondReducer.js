
const initialState = {
    combinedRoute: {},
    comer: {},
    giver: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'SET_COMBINED_ROUTE':
            return {
                ...state,
                combinedRoute: action.payload
            }
        case 'SET_COMER':
            return {
                ...state,
                comer: action.payload
            
            }
        case 'SET_GIVER':
            return {
                ...state,
                GIVER: action.payload
            }

        default:
            return state;
    }
};