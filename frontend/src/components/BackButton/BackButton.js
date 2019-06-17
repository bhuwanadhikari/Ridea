import React from 'react'
import ArrowBack from '../../img/ArrowBack.svg';
import './BackButton.css'

function BackButton(props) {
    return (
        <div className="BackButton">
            <img className="ArrowBack" src={ArrowBack} alt="back button of ridea"></img>

        </div>
    )
}

export default BackButton
