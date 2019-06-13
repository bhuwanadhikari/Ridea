import React, { Component } from 'react';
import './Footer.css';
import Locate from '../../img/Locate.svg';
import AddRoute from '../../img/AddRoute.svg';
class NavBar extends Component {
    render() {
        return (
            <footer className='Footer'>
                <nav className='FooterNavigation'>
                    <div className='AddRouteButtonWrapper'>
                    <div className="ButtonEnclosure">
                    <img className='AddRouteIcon'  alt='AddRoute icon of ridea' src={AddRoute} ></img>
                    </div>
                    </div>
                    <div className="Spacer"></div>
                    <div className='LocateButtonWrapper'>
                        <div className="ButtonEnclosure">
                        <img className='LocateIcon'  alt='Locate icon of ridea' src={Locate}></img>
                        </div>
                    </div>
                </nav>
            </footer>
        )
    }
}

export default NavBar