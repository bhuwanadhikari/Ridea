import React, { Component } from 'react';
import './Footer.css';
import Locate from '../../img/Locate.svg';
import AddRoute from '../../img/AddRoute.svg';
class NavBar extends Component {
    render() {
        return (
            <footer className='Footer'>
                <nav className='FooterNavigation'>
                    
                    <div className="Spacer"></div>
                    <div className='LocateButtonWrapper'>
                        <div className="ButtonEnclosure" onClick={this.props.locateClicked}>
                            <img className='LocateIcon' alt='Locate icon of ridea' src={Locate}></img>
                        </div>
                    </div>
                </nav>
            </footer>
        )
    }
}

export default NavBar
