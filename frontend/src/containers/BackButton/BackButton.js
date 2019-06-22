import React from 'react'
import ArrowBack from '../../img/ArrowBack.svg';
import './BackButton.css';
import {Link} from 'react-router-dom'

function BackButton(props) {
    return (
       <Link to={props.route}>
        <div className="BackButton">
            <img className="ArrowBack" src={ArrowBack} alt="back button of ridea"></img>

        </div>
        </Link>
    )
}

export default BackButton
