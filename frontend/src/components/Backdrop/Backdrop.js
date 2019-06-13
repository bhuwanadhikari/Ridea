import React from 'react'
import './Backdrop.css';

const Backdrop=(props)=> {
    return (
        <div className='Backdrop' onClick={props.clicked}/>
    )
}

export default Backdrop;
