import React, { Component } from 'react'

const HisLocation = (props) => {
    let i = 1;
    return (
        <div className="HisLocation Wrapper">
            <button onClick = {props.onDone}>Done</button>
            <button onClick = {props.onLocate}>See my Location</button>
        </div>
    )
}


export default HisLocation
