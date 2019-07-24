import React, { Component } from 'react'
import './DialogBottom.css';

class DialogBottom extends Component {
    render() {
        return (
            <div
                className="DialogBottomContainer"
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}
            >
                {this.props.children}
            </div>
        )
    }
}

export default DialogBottom;
