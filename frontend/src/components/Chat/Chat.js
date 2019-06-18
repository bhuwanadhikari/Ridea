import React, { Component } from 'react'
import './Chat.css';
import ChatToolBar from './ChatToolBar';
import ChatThumbnail from './ChatThumbnail';

class Chat extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            routeBack:'/home'        }
    }
    render() {
        return (
           
            <div className="ChatPageContainer">
             <div className="ChatToolbarContainer"> <ChatToolBar route={this.state.routeBack}/></div>  
             <div className="ChatThumbnailsWrapper">
             <ChatThumbnail/><ChatThumbnail/><ChatThumbnail/><ChatThumbnail/>
             <ChatThumbnail/><ChatThumbnail/><ChatThumbnail/><ChatThumbnail/><ChatThumbnail/>
             <ChatThumbnail/><ChatThumbnail/><ChatThumbnail/><ChatThumbnail/><ChatThumbnail/>
             </div> 
             <div className="MessagesWrapper"> here is your message</div> 
            </div>
        )
    }
}

export default Chat
