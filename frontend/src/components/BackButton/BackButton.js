import React from 'react'
import ArrowBack from '../../img/ArrowBack.svg';

function BackButton(props) {
    return (
        <button className="BackButton">
            <img calssName="ArrowBack"src={ArrowBack}></img>

        </button>
    )
}

export default BackButton
