import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import avatar from '../../../img/avatar.png';
import './ChatBody.css';

import io from 'socket.io-client';

const socketUrl = 'http://localhost:3231';


class ChatBody extends Component {

    constructor(props) {
        super(props)

        this.state = {
            socket: null,
            me: null,
            u: null,
            message: {
                from: 'me',
                to: 'him',
                body: 'Hello! how are ou',
                createdAt: 'today'
            }


        }
    }

    componentWillMount() {
        this.initSocket();
    }

    componentDidMount() {
        const { socket } = this.state;
        socket.on('GET_MESSAGE', (message) => {
            console.log('Message received', message);
        });

        const myId = this.props.auth.user.id;
        socket.emit('VERIFY_USER', myId, this.setUser);

    }

    componentWillUnmount() {
        const { socket } = this.state;
        console.log("Unmounting");
        socket.emit('disconnect');
        socket.disconnect();
    }



    initSocket = () => {
        const socket = io(socketUrl);
        socket.on('connect', () => {
            console.log('Connected');
        })
        this.setState({ socket });
    }

    setUser = (data) => {
        if (data) {
            console.log("New user will be added");
            const { socket } = this.state;
            const userId = this.props.auth.user.id;
            socket.emit('ADD_USER', userId);

        } else {
            console.log("You have opened your id in another devices");
        }
    }











    handleSend = (e) => {
        e.preventDefault();

        console.log("handle send has bee clicked");
        const { socket, message } = this.state;
        socket.emit('SEND_MESSAGE', message);
    }



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


                    <form className="chat-message clearfix" onSubmit={this.handleSend}>
                        <input type="text" className="message-to-send" placeholder="Type your message"></input>
                        <button type='submit' className="sendButton">Send</button>
                    </form>


                </div>

            </div>


        );
    }
}



ChatBody.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(ChatBody);