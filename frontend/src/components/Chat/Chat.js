import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ChatBody from './ChatBody/ChatBody';
import './Chat.css';

class Chat extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }
    render() {
        const show = this.props.nav.showChat;
        return (
            <div
                className="ChatPageContainer"
                style={{
                    transform: show ? 'translateX(0)' : 'translateX(100vw)'
                }}
            >
                <ChatBody/>

            </div>
        )
    }
}

Chat.propTypes = {
    nav: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    nav: state.nav,
})

export default connect(mapStateToProps)(Chat);
