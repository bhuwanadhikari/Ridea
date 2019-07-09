import React from 'react'
 
import {connect} from 'react-redux';
import store from '../../redux/store/store';
import './DrawerToggleButton.css';
const DrawerToggleButton = (props) => {

    const notification = props.bell.showBellSign;

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
