import React from 'react'
 
import {connect} from 'react-redux';
import './DrawerToggleButton.css';
const DrawerToggleButton = (props) => {

    var notification = false;
    if(props.bell.requestedBy){
        if(props.bell.requestedBy.length>0){
        notification = true;
        }
    }

    let notifier = (
        <div className="Notifier"></div>
    )
    return (
        <button className='ToggleButton' id='ToggleButton' onClick={props.clicked}>
            {notification && notifier}

            <div className='ToggleButtonLine'></div>
            <div className='ToggleButtonLine' ></div>
            <div className='ToggleButtonLine'></div>
        </button>
    )
}

const mapStateToProps = state => ({
    bell: state.bell
})

export default connect(mapStateToProps)(DrawerToggleButton);
