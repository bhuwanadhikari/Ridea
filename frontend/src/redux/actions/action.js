import axios from 'axios';
import store from '../store/store';


export const getMyData = () => {
    // axios
    //     .get('/api/users/my-data')
    //     .then((result) => {
    //         const { requestedBy, requestedTo, acceptedBy, acceptedTo, rejectedBy, rejectedTo } = result.data;

    //         store.dispatch({ type: 'SET_REQUESTEDTO_ROUTES', payload: requestedTo });
    //         store.dispatch({ type: 'SET_REQUESTEDBY_ROUTES', payload: requestedBy });

    //         store.dispatch({ type: 'SET_ACCEPTEDTO_ROUTES', payload: acceptedTo });
    //         store.dispatch({ type: 'SET_ACCEPTEDBY_ROUTES', payload: acceptedBy });

    //         store.dispatch({ type: 'SET_REJECTEDBY_ROUTES', payload: rejectedTo });
    //         store.dispatch({ type: 'SET_REJECTEDTO_ROUTES', payload: rejectedBy });



    //     }).catch((err) => {
    //         console.log("Error in getMyData action in redux", err);
    //     });
}

export const poleData = () => dispatch => {
    axios
        .get('/api/users/my-data')
        .then((result) => {
            console.log("Poling is working", result.data);

            const { requestedBy, requestedTo, acceptedBy, acceptedTo, rejectedBy, rejectedTo } = result.data;


            dispatch({ type: 'SET_REQUESTEDTO', payload: requestedTo });
            dispatch({ type: 'SET_REQUESTEDBY', payload: requestedBy });

            dispatch({ type: 'SET_ACCEPTEDTO', payload: acceptedTo });
            dispatch({ type: 'SET_ACCEPTEDBY', payload: acceptedBy });

            dispatch({ type: 'SET_REJECTEDBY', payload: rejectedTo });
            dispatch({ type: 'SET_REJECTEDTO', payload: rejectedBy });

            if (acceptedBy) {
                const sharedPayload = { status: true, with: acceptedBy }
                dispatch({ type: 'SET_SHARED', payload: sharedPayload })
            }

            if (acceptedTo) {
                const sharedPayload = { status: true, with: acceptedTo }
                dispatch({ type: 'SET_SHARED', payload: sharedPayload })
            }

        }).catch((err) => {
            console.log("Error Poling", err.response.data);
        });
}