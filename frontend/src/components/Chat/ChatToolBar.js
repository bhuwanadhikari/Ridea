import React from 'react'
import BackButton from '../BackButton/BackButton';
import './ChatToolBar.css';
import EllipseButton from '../../containers/Button/EllipseButton';


function ChatToolBar() {
    return (
        <header className='Toolbar'>
                <nav className='ToolbarNavigation'>
                    <div className='BackButtonWrapper'> <BackButton/> </div>
                    <div className="Spacer"><EllipseButton/></div>
                    <div className='Header'>Chat</div>
                    {/* <div className="Spacer2"></div> */}
                    </nav>
                </header>
    )
}

export default ChatToolBar
