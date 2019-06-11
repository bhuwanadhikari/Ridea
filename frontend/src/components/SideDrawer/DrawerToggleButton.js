import React from 'react'
import './DrawerToggleButton.css';

const DrawerToggleButton=(props)=> {
    return (
        <button className='Toggle-Button' onClick={props.clicked}>
            <div className='Toggle-Button-Line'></div>
            <div className='Toggle-Button-Line' ></div>
            <div className='Toggle-Button-Line'></div>
        </button>   )
}

export default DrawerToggleButton
