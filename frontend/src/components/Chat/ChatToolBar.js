import React from 'react'
import BackButton from '../BackButton/BackButton';


function ChatToolBar() {
    return (
        <header className='Toolbar'>
                <nav className='ToolbarNavigation'>
                    <div className='BackButtonWrapper'> <BackButton/> </div>
                    <div className="spacer"></div>
                    <div className='Header'>Chat</div>
                    </nav>
                </header>
    )
}

export default ChatToolBar
