import React from 'react'
import Aux from '../../hoc/Auxi';
import BackDrop from '../../ui/BackDrop/BackDrop';
import './SideDrawer.css';


class SideDrawer extends React.Component {
    render() {
        return (
            <Aux>
                <BackDrop show={this.props.show} clicked={this.props.drawerClosed} />
                <div 
                className='SideDrawer' 
                style={{
                    transform: this.props.show ? 'translateX(0)' : 'translateX(-100vw)'
                 }}
                >
                    <ul>
                        <li>chat</li>
                        <li>home</li>
                    </ul>
                </div>
            </Aux>
        )
    }
} 

export default SideDrawer;
