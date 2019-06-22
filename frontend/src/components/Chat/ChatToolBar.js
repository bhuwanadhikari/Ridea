import React from 'react'
import BackButton from '../../containers/BackButton/BackButton';
import './ChatToolBar.css';


function ChatToolBar(props) {
    return (
        <header className='ChatToolbar'>
                <nav className='ToolbarNavigation'>
                    <div className='BackButtonWrapper'> <BackButton route={props.route}/> </div>
                    <div className='Header'>Chat</div>
                    </nav>
                </header>
    )
}

export default ChatToolBar
