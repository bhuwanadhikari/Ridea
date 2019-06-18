import React from 'react'
import Aux from '../../hoc/Auxi';
import BackDrop from '../../ui/BackDrop/BackDrop';
import './SideDrawer.css';
import home from '../../img/SidebarImg/home.svg';
import notification from '../../img/SidebarImg/notification.svg';
import feedback from '../../img/SidebarImg/feedback.svg';

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
                    <div className="ProfileContainer"></div>
                    <div className="OptionsWrapper">
                    <ul>
                       <div className="ListWrapper"> <li><div className="IconWrapper"><img src={home} alt="Ridea home"></img></div>Home</li></div>
                       <div className="ListWrapper"> <li><div className="IconWrapper"><img src={notification} alt="Ridea notification"></img></div>Notification</li></div>
                       <div className="ListWrapper"> <li><div className="IconWrapper"><img src={feedback} alt="Ridea feedback"></img></div>Feedback</li></div>
                       <div className="ListWrapper"> <li><div className="IconWrapper"></div>About</li></div>
                       <div className="ListWrapper"> <li><div className="IconWrapper"></div>Privacy policy</li></div>
                       <div className="ListWrapper"> <li><div className="IconWrapper"></div>Logout</li></div>

                    </ul>
                    </div>
                </div>
            </Aux>
        )
    }
} 

export default SideDrawer;
