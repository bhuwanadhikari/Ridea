import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';




export const poleData = () => async dispatch => {
    await axios
        .get('/api/users/my-data')
        .then((result) => {
            // console.log("Poling is working", result.data);

            const { requestedBy, requestedTo, acceptedBy, acceptedTo, rejectedBy, rejectedTo } = result.data;


            dispatch({ type: 'SET_REQUESTEDTO', payload: requestedTo });
            dispatch({ type: 'SET_REQUESTEDBY', payload: requestedBy });

            dispatch({ type: 'SET_ACCEPTEDTO', payload: acceptedTo });
            dispatch({ type: 'SET_ACCEPTEDBY', payload: acceptedBy });

            dispatch({ type: 'SET_REJECTEDBY', payload: rejectedBy });
            dispatch({ type: 'SET_REJECTEDTO', payload: rejectedTo });

            if (acceptedBy) {
                const sharedPayload = { status: true, with: acceptedBy }
                dispatch({ type: 'SET_SHARED', payload: sharedPayload })
            }

            if (acceptedTo) {
                const sharedPayload = { status: true, with: acceptedTo }
                dispatch({ type: 'SET_SHARED', payload: sharedPayload })
            }

        }).catch((err) => {
            console.log("Error Poling", err);
        });



    await axios
        .get(`/api/directions/get-by-owner`)
        .then((res) => {
            dispatch({
                type: 'SET_ACTIVITY_DATA',
                payload: res.data
            })
        }).catch((err) => {
            console.log(err, 'in the requested-by wala');
        });
}



export const logout = () => async dispatch => {
    console.log('Logged oute');
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    //reset the whole store
    dispatch({type: 'SET_USER',payload: {}});
    dispatch({type: 'RESET_NAV'});
    dispatch({type: 'RESET_BELL'});
    window.document.title = "Ridea";
}