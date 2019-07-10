import axios from 'axios';
import store from '../store/store';


export const getMyData = () => dispatch => {
    axios
        .get('/api/users/my-data')
        .then((result) => {
            const { notifiedBy } = result.data;
            // store.dispatch({ type: 'SET_NOTIFIEDBY_ROUTES', payload: notifiedBy });
            // store.dispatch({ type: 'SET_RESPONSE_PROGRESS', payload: 'NOTIFIEDBY_IS_FETCHED' })
        }).catch((err) => {
            console.log("Error in getMyData action in redux", err);
        });
}

export const poleData = () => dispatch => {
    axios
        .get('/api/users/my-data')
        .then((result) => {
            console.log("Poling is working", result.data);
            // const { notifiedBy, acceptedBy, acceptedTo } = result.data;
            // store.dispatch({ type: 'SET_NOTIFIEDBY_ROUTES', payload: notifiedBy });
            // if(acceptedBy){
            //     const sharedPayload= {status: true, with: acceptedBy}
            //     store.dispatch({type: 'SET_SHARED', payload: sharedPayload})
            // }
            
        }).catch((err) => {
            console.log("Error in getMyData action in redux", err);
        });
}