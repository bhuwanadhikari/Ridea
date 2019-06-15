import React, { Component } from 'react'
import './Chat.css';
// import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import ChatToolBar from './ChatToolBar';
import ChatThumbnail from './ChatThumbnail';
class Chat extends Component {
    render() {
        return (
           
            <div className="ChatPageContainer">
             <div className="ChatToolbarContainer"> <ChatToolBar/></div>  
             <div className="ChatThumbnailContainer"></div>  
            </div>
        )
    }
}

export default Chat
