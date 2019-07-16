import React, { Component } from 'react';
import PropTypes from 'prop-types';
import avatar from '../../../img/avatar.png';

import './ChatBody.css';

class ChatBody extends Component {
    render() {
        return (
            <div className="ChatContainer clearfix">
            
                <div className="chat">
                    <div className="chat-header clearfix">
                        <div className="avatarWrapper">
                            <img className="avatar" src={avatar} alt="avatar" />
                        </div>
                        <div className="chat-about">
                            <div className="chat-with">Chat with Basudev Adhikari</div>
                            <div className="chat-num-messages">Your Ride Partner</div>
                        </div>
                    </div>


                    <div className="chat-history">
                        <ul>
                            <li className="clearfix">
                                <div className="message-data align-right">
                                    <span className="message-data-time" >10:10 AM, Today</span> &nbsp; &nbsp;
                                    <span className="message-data-name" >You</span> <i className="fa fa-circle me"></i>

                                </div>
                                <div className="message other-message float-right">
                                    Hi Vincent
                                </div>
                            </li>
                            <li className="clearfix">
                                <div className="message-data align-right">
                                    <span className="message-data-time" >10:10 AM, Today</span> &nbsp; &nbsp;
                                    <span className="message-data-name" >You</span> <i className="fa fa-circle me"></i>

                                </div>
                                <div className="message other-message float-right">
                                    Hi Vincent
                                </div>
                            </li>


                            <li>
                                <div className="message-data align-left">
                                    <span className="message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
                                    <span className="message-data-time">10:20 AM, Today</span>
                                </div>
                                <div className="message my-message">
                                    Actually everything was fine.
                                </div>
                            </li>

                            <li>
                                <div className="message-data align-left">
                                    <span className="message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
                                    <span className="message-data-time">10:20 AM, Today</span>
                                </div>
                                <div className="message my-message">
                                    Actually everything was fine.
                                </div>
                            </li>


                            <li>
                                <div className="message-data align-left">
                                    <span className="message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
                                    <span className="message-data-time">10:20 AM, Today</span>
                                </div>
                                <div className="message my-message">
                                Actually everything was fine.Actually everything was fine.Actually everything was fine.
                                </div>
                            </li>

                            <li>
                                <i className="fa fa-circle online"></i>
                                <i className="fa fa-circle online" style={{ color: '#AED2A6' }}></i>
                                <i className="fa fa-circle online" style={{ color: '#DAE9DA' }}></i>
                            </li>

                        </ul>

                    </div>


                    <form className="chat-message clearfix">
                        <textarea name="message-to-send" className="message-to-send" placeholder="Type your message" rows="1"></textarea>
                        <button type = 'submit' className="sendButton">Send</button>

                    </form>


                </div>

            </div>


        );
    }
}



ChatBody.propTypes = {

};

export default ChatBody;