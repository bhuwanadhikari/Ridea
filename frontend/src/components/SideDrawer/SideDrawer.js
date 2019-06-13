import React from 'react'
import './SideDrawer.css';

const SideDrawer=(props)=> {
    return (
        
            <nav className='SideDrawer' style={props.Style}>
                <ul>
                        <li>chat</li>
                        <li>home</li>
                    </ul>
                </nav>
    )
}

export default SideDrawer;
