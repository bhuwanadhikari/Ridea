    import React from 'react';
    import {ToastsContainer, ToastsStore} from 'react-toasts';
import './Toast.css';
 
function render(props){
    return <div className = "ToastWrapper">
        <button onClick={() => ToastsStore.success(props.message)}>Click me</button>
        <ToastsContainer store={ToastsStore} lightBackground/>
    </div>
}

export default render;