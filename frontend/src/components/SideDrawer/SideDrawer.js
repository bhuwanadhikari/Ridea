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
                        <div className="ListWrapper"><div className="IconWrapper"><img src={home} alt="Ridea Home"></img></div>Home</div>
                        <div className="ListWrapper"><div className="IconWrapper"><img src={notification} alt="Ridea Notification"></img></div>Notification</div>
                        <div className="ListWrapper"><div className="IconWrapper"><img src={feedback} alt="Ridea Feedback"></img></div>Feedback</div>
                        <div className="ListWrapper"><div className="IconWrapper"></div>About</div>
                        <div className="ListWrapper"><div className="IconWrapper"></div>Privacy policy</div>
                        <div className="ListWrapper"><div className="IconWrapper"></div>Logout</div>

                    </div>
                </div>
            </Aux>
        )
    }
}

export default SideDrawer;
