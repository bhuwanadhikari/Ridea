import React, { Component } from 'react'
import EllipseButton from '../../containers/Button/EllipseButton';
import './ChatThumbnail.css';

class ChatThumbnail extends Component {
    render() {
        return (
            <div className="Container">
                <div className="ProfilePictureWrapper"><div className="PictureEnclosure"></div></div>
                <div className="RecentMessegeWrapper">Recent Messege</div>
                <div className="MoreButtonWrapper"><EllipseButton/></div>
                
            </div>
        )
    }
}

export default ChatThumbnail
