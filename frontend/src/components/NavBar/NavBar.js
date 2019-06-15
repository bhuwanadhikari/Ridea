import React, { Component } from 'react'
import './NavBar.css';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import Search from '../Search/Search';
import message from '../../img/navImg/message.svg';
import {Link} from 'react-router-dom';

class NavBar extends Component {
    render() {
        return (
            <header className='Toolbar'>
                <nav className='ToolbarNavigation'>
                    <div className='HamBurgerWrapper'><DrawerToggleButton clicked={this.props.clicked}/></div>
                    <div className='SearchWrapper'><Search/></div>
                    <div className='Spacer'></div>
                    <Link to='/Chat'>
                    <div className='ChatIconWrapper'><div className='ImageEnclosure'><img className='AuthMessageIcon' src={message} alt='Message icon of ridea'></img></div></div>
                    </Link>
                </nav>
                </header>
        )
    }
}

export default NavBar
