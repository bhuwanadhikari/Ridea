import React from 'react'
import Aux from '../../hoc/Auxi';
import BackDrop from '../../ui/BackDrop/BackDrop';
import './SideDrawer.css';
import home from '../../img/SidebarImg/home.svg';
import notification from '../../img/SidebarImg/notification.svg';
import feedback from '../../img/SidebarImg/feedback.svg';

class SideDrawer extends React.Component {
    render() {
        let { show } = this.props;
        show = true;
        return (
            <Aux>
                <BackDrop show={show} clicked={this.props.drawerClosed} />
                <div
                    className='SideDrawer'
                    style={{
                        transform: show ? 'translateX(0)' : 'translateX(-100vw)'
                    }}
                >
                    <div className="ProfileContainer"></div>
                    <div className="OptionsWrapper">

                        <div className="ListWrapper">
                            <img className="ListImg" src={home} alt="Ridea Home" />
                            <div className="LabelWrapper">
                                Home
                            </div>
                        </div>

                        <div className="ListWrapper">
                            <img className="ListImg" src={notification} alt="Ridea Notification" />
                            <div className="LabelWrapper">
                                Notification
                            </div>
                        </div>

                        <div className="ListWrapper">
                            <img className="ListImg" src={feedback} alt="Ridea Feedback" />
                            <div className="LabelWrapper">
                                Feedback
                            </div>
                        </div>

                        <div className="ListWrapper">
                            <div className="LabelWrapper">
                                About
                            </div>
                        </div>

                        <div className="ListWrapper">
                            <div className="LabelWrapper">
                                Privacy Policy
                            </div>
                        </div>

                        <div className="ListWrapper">
                            <div className="LabelWrapper">
                                Logout
                            </div>
                        </div>

                    </div>
                </div>
            </Aux>
        )
    }
}

export default SideDrawer;
