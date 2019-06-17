import React, { Component } from 'react'
import EllipseButton from '../../containers/Button/EllipseButton';

class ChatThumbnail extends Component {
    render() {
        return (
            <div className="ChatThumbnailContainer">
                <div className="ProfilePictureWrapper"></div>
                <div className="RecentMessegeWrapper">Recent Messege</div>
                <div className="MoreButtonWrapper"><EllipseButton/></div>
                
            </div>
        )
    }
}

export default ChatThumbnail
