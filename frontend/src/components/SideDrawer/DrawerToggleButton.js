import React from 'react'
import './DrawerToggleButton.css';

const DrawerToggleButton=(props)=> {
    return (
        <button className='ToggleButton' onClick={props.clicked}>
            <div className='ToggleButtonLine'></div>
            <div className='ToggleButtonLine' ></div>
            <div className='ToggleButtonLine'></div>
        </button>   )
}

export default DrawerToggleButton
