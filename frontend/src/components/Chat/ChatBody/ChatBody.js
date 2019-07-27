import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import avatar from '../../../img/avatar.png';
import more from '../../../img/more.svg'
import BackButton from '../BackButton/BackButton';
import './ChatBody.css';


import io from 'socket.io-client';
import store from '../../../redux/store/store';

const socketUrl = 'https://ridea-chat.herokuapp.com/';


class ChatBody extends Component {

    constructor(props) {
        super(props)

        this.state = {
            socket: io(socketUrl),
            canSend: false,
            hisName: '',
            message: {
                ownerName: '',
                from: '',
                to: '',
                body: '',
            },

            messages: [],
            hisStatus: 'Offline'
        }
    }


    componentDidMount() {
        const { socket } = this.state;
        socket.on('GET_HIS_LOCATION', hisLocation => {
            console.log('His Location is', hisLocation);
            if (hisLocation) {
                this.setState({ hisStatus: 'Online' });
                store.dispatch({
                    type: 'SET_HIS_LOCATION',
                    payload: hisLocation
                })
                store.dispatch({
                    type: 'SET_HIS_STATUS',
                    payload: 'Online'
                })
            } else {
            }
        })

        socket.on('HIS_STATUS', status => {
            this.setState({ hisStatus: status });
            store.dispatch({
                type: 'SET_HIS_STATUS',
                payload: status
            });

        })
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

        const { acceptedTo, acceptedBy } = this.props.bell;
        const hisId = acceptedBy || acceptedTo;
        if (hisId) {
            socket.emit('GO_OFFLINE', { me: userId, him: hisId })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        this.scrollDown();


        const trasferLocation = (to) => {
            //transfer your location
            const { realLocation } = this.props.nav;
            const { socket } = this.state;
            if (prevProps.nav.realLocation !== realLocation) {
                // console.log('New location is', realLocation);
                socket.emit('LOCATE', { realLocation: realLocation, to: to })
            }

        }


        //For getting the name of pal and initiate the connection
        const { acceptedTo, acceptedBy } = this.props.bell;
        if (!acceptedTo && acceptedBy) {
            if (prevProps.bell.acceptedBy !== acceptedBy) {
                this.initConnection();
                this.gethisName(acceptedBy);
            }

            trasferLocation(acceptedBy)
        }
        if (acceptedTo && !acceptedBy) {
            if (prevProps.bell.acceptedTo !== acceptedTo) {
                this.initConnection();
                this.gethisName(acceptedTo);
            }
            trasferLocation(acceptedTo)
        }
    }







    initConnection = () => {
        const { socket } = this.state;
        socket.on('GET_MESSAGE', (newMsg) => {
            console.log("message received", newMsg);
            newMsg.createdAt = this.manageTime(newMsg.createdAt);

            const { messages } = this.state;
            messages.push(newMsg);
            this.setState({ messages });
        });

        const myId = this.props.auth.user.id;

        socket.emit('VERIFY_USER', myId, this.setUser);
        socket.on('REMOVED', (riders) => {
            console.log('Riders after the disconnection', riders);
        })
    }

    gethisName = (palId) => {
        axios
            .get(`/api/users/get-user/${palId}`)
            .then((result) => {
                this.setState({
                    hisName: result.data.name
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

    manageTime = (plain) => {
        // console.log('Plain date is :', plain);
        var thatTime = new Date(plain).getTime();
        var currentTime = new Date().getTime();

        const thatDay = new Date(thatTime).getDate();
        const currentDay = new Date(currentTime).getDate();

        let theTime = new Date(plain).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

        if (thatDay !== currentDay) {
            return `Yesterday ${theTime}`
        } else {
            return `Today ${theTime}`
        }
    }

    setUser = (data) => {
        if (data) {
            const { socket } = this.state;
            const userId = this.props.auth.user.id;
            const palId = this.getPalId();
            socket.emit('ADD_USER', userId, palId, (messages) => {
                messages.forEach(message => {
                    message.createdAt = this.manageTime(message.createdAt);
                });
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

    handleShowHim = () => {
        const { showHisLocation, hisLocation } = this.props.nav;
        if (this.state.hisStatus === 'Online') {
            //do job here
            console.log("parner is online")
            store.dispatch({
                type: 'SET_SHOW_HIM',
                payload: true
            })
            store.dispatch({
                type: 'SET_CHAT',
                payload: false
            })
        } else {
            alert('Partner is offline');
        }
    }

    scrollDown = () => {
        if (this.messageEnd) {
            this.messageEnd.scrollIntoView({ behavior: 'smooth' });
        }
    }


    render() {

        const { acceptedBy, acceptedTo } = this.props.bell;

        console.log("His state is", this.state.hisStatus);
        console.log("AcceptedBy or accpted to is", acceptedBy || acceptedTo);
        const { messages, hisName } = this.state;
        var myName = this.props.auth.user.name;
        // console.log("message now is:", this.state.message);
        return (
            <div className="ChatContainer clearfix">
            
            <BackButton />

                {!this.state.message.to
                    ? <div className="noChat"><b>No shared ride to discuss</b></div>
                    : (
                        <div className="chat">


                            <div className="chat-header clearfix">
                                <div className="avatarWrapper">
                                    <img className="avatar" src={avatar} alt="avatar" />
                                </div>
                                <div className="chat-about">
                                    <div className="chat-with">Chat with {hisName}</div>

                                    <div className="chat-num-messages">Ride Partner ({this.state.hisStatus})</div>
                                </div>

                                <div
                                    className="SeePartner"
                                    onClick={this.handleShowHim}
                                >
                                    Partner's location</div>

                            </div>


                            <div className="chat-history">
                                <ul>
                                    {messages.map((item, index) => {


                                        if (myName === item.ownerName) {
                                            return (
                                                <li className="clearfix" key={index}>
                                                    <div className="message-data align-right">
                                                        <span className="message-data-time" >{item.createdAt}</span> &nbsp; &nbsp;
                                                        <span className="message-data-name" >You</span>
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
                                                        <span className="message-data-name">{item.ownerName}</span>
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
    nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    nav: state.nav,
    bell: state.bell,

})

export default connect(mapStateToProps)(ChatBody);


// <li>
//     <i className="fa fa-circle online"></i>
//     <i className="fa fa-circle online" style={{ color: '#AED2A6' }}></i>
//     <i className="fa fa-circle online" style={{ color: '#DAE9DA' }}></i>
// </li>