import React from 'react'
import BackButton from '../../containers/BackButton/BackButton';
import './ChatToolBar.css';


function ChatToolBar(props) {
    return (
        <header className='ChatToolbar'>
            <nav className='ToolbarNavigation'>
                <div className='Header'></div>
                <div className='BackButtonWrapper'>
                    <BackButton />
                </div>
            </nav>
        </header>
    )
}

export default ChatToolBar
