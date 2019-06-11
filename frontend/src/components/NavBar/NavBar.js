import React, { Component } from 'react'
import './NavBar.css';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';

class NavBar extends Component {
    render() {
        return (
            <header className='Toolbar'>
                <nav className='Toolbar-Navigation'>
                    <div><DrawerToggleButton clicked={this.props.clicked}/></div>
                  <div className='Toolbar-Logo'><h1>The Logo</h1></div>
                  <div className='Spacer'/> 
                   <div className='Toolbar-Navigation-links'>
                    <ul>
                        <li>chat</li>
                        <li>home</li>
                    </ul>
                    </div>
                </nav>
                </header>
        )
    }
}

export default NavBar
