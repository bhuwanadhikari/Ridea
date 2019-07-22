import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import avatar from '../../../img/avatar.png';
import './ChatBody.css';

import io from 'socket.io-client';

const socketUrl = 'http://localhost:3231';


class ChatBody extends Component {

    constructor(props) {
        super(props)

        this.state = {
            socket: io(socketUrl),
            canSend: false,
            palName: '',
            message: {
                ownerName: '',
                from: '',
                to: '',
                body: '',
            },

            messages: []
        }
    }


    componentDidMount() {

    }


    static getDerivedStateFromProps(nextProps, prevState) {
        const { acceptedBy, acceptedTo } = nextProps.bell;
        const { name } = nextProps.auth.user;
        if (acceptedBy && (prevState.message.to !== acceptedBy)) {



            return {
                message: {
                    ...prevState.message,
                    ownerName: name,
                    from: nextProps.auth.user.id,
                    to: acceptedBy
                }
            };
        }
        else if (acceptedTo && (prevState.message.to !== acceptedBy)) {
            return {
                message: {
                    ...prevState.message,
                    ownerName: name,
                    from: nextProps.auth.user.id,
                    to: acceptedTo
                }
            };
        }

        return {}
    }



    componentWillUnmount() {
        const { socket } = this.state;
        console.log("Unmounting");
        // socket.emit('disconnect');
        socket.disconnect();
        const userId = this.props.auth.user.id;
        socket.emit('REMOVAL', userId);
    }

    componentDidUpdate(prevProps, prevState) {
        this.scrollDown();
        if (this.messageInput) {
            this.messageInput.focus();
        }

        //For getting the name of pal and initiate the connection
        const { acceptedTo, acceptedBy } = this.props.bell;
        if (!acceptedTo && acceptedBy) {
            if (prevProps.bell.acceptedBy !== acceptedBy) {
                this.initConnection();
                this.getPalName(acceptedBy);
            }
        }
        if (acceptedTo && !acceptedBy) {
            if (prevProps.bell.acceptedTo !== acceptedTo) {
                this.initConnection();
                this.getPalName(acceptedTo);
            }
        }

    }





    initSocket = () => {
        const socket = io(socketUrl);
        socket.on('connect', () => {
            console.log('Connected');
        })
        this.setState({ socket });
    }

    initConnection = () => {
        const { socket } = this.state;
        socket.on('GET_MESSAGE', (message) => {
            console.log("message received", message);
            const { messages } = this.state;
            messages.push(message);
            this.setState({ messages })
        });

        const myId = this.props.auth.user.id;
        console.log("Id of mine is", myId);
        console.log("Id of the other pal is", this.props.bell.acceptedBy);
        console.log("Id of the other pal is", this.props.bell.acceptedTo);

        socket.emit('VERIFY_USER', myId, this.setUser);
        socket.on('REMOVED', (riders) => {
            console.log('Riders after the disconnection', riders);
        })
    }

    getPalName = (palId) => {
        axios
            .get(`/api/users/get-user/${palId}`)
            .then((result) => {
                this.setState({
                    palName: result.data.name
                })

            }).catch((err) => {
                console.log('Error in api call for palId', err);
            });
    }

    getPalId = () => {
        const { acceptedTo, acceptedBy } = this.props.bell;
        if (!acceptedTo && acceptedBy) {
            return acceptedBy;
        }
        if (acceptedTo && !acceptedBy) {
            return acceptedTo;
        }
    }

    setUser = (data) => {
        if (data) {
            console.log("New user will be added");
            const { socket } = this.state;
            const userId = this.props.auth.user.id;
            const palId = this.getPalId();
            socket.emit('ADD_USER', userId, palId, (messages) => {
                this.setState({ messages });
            });

        } else {
            console.log("You have opened your id in another devices");
        }
    }

    handleSend = (e) => {
        e.preventDefault();
        console.log("handle send has bee clicked");
        const { socket, message } = this.state;
        if (message.body.length > 0) {
            socket.emit('SEND_MESSAGE', message);
            console.log("PRINTED", message);
        } else {
            console.log("Message not sent");
        }
        this.setState({
            message: {
                ...this.state.message,
                body: ''
            }
        });
    }

    handleOnChange = (e) => {
        this.setState({
            message: {
                ...this.state.message,
                body: e.target.value
            }
        });
    }

    scrollDown = () => {
        if (this.messageEnd) {
            this.messageEnd.scrollIntoView({ behavior: 'smooth' });
        }
    }


    render() {
        const { messages, palName } = this.state;
        var myName = this.props.auth.user.name;
        // console.log("message now is:", this.state.message);
        return (
            <div className="ChatContainer clearfix">

                {!this.state.message.to
                    ? <div className="noChat"><b>No shared ride to discuss</b></div>
                    : (
                        <div className="chat">


                            <div className="chat-header clearfix">
                                <div className="avatarWrapper">
                                    <img className="avatar" src={avatar} alt="avatar" />
                                </div>
                                <div className="chat-about">
                                    <div className="chat-with">Chat with {palName}</div>
                                    <div className="chat-num-messages">Your Ride Partner</div>
                                </div>
                            </div>


                            <div className="chat-history">
                                <ul>
                                    {messages.map((item, index) => {

                                        if (myName === item.ownerName) {
                                            return (
                                                <li className="clearfix" key={index}>
                                                    <div className="message-data align-right">
                                                        <span className="message-data-time" >{item.createdAt}</span> &nbsp; &nbsp;
                                                        <span className="message-data-name" >You</span> <i className="fa fa-circle me"></i>
                                                    </div>
                                                    <div className="message other-message float-right">
                                                        {item.body}
                                                    </div>
                                                </li>
                                            )
                                        } else {
                                            return (
                                                <li key={index}>
                                                    <div className="message-data align-left" key={index}>
                                                        <span className="message-data-name"><i className="fa fa-circle online"></i> {item.ownerName}</span>
                                                        <span className="message-data-time">{item.createdAt}</span>
                                                    </div>
                                                    <div className="message my-message">
                                                        {item.body}
                                                    </div>
                                                </li>
                                            )
                                        }
                                    })}




                                    <div
                                        ref={(el) => { this.messageEnd = el }}
                                    >
                                    </div>



                                </ul>

                            </div>


                            <form className="chat-message clearfix" onSubmit={this.handleSend}>
                                <input
                                    type="text"
                                    className="message-to-send"
                                    placeholder="Type your message"
                                    onChange={this.handleOnChange}
                                    value={this.state.message.body}
                                    autoFocus={true}
                                    ref={(input) => { this.messageInput = input; }}
                                />
                                <button
                                    type='submit'
                                    className="sendButton"
                                >
                                    Send
                                </button>
                            </form>

                        </div>)
                }


            </div>


        );
    }
}



ChatBody.propTypes = {
    auth: PropTypes.object.isRequired,
    bell: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    bell: state.bell
})

export default connect(mapStateToProps)(ChatBody);


// <li>
//     <i className="fa fa-circle online"></i>
//     <i className="fa fa-circle online" style={{ color: '#AED2A6' }}></i>
//     <i className="fa fa-circle online" style={{ color: '#DAE9DA' }}></i>
// </li>