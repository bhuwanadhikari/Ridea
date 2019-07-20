import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import store from '../../redux/store/store';
import './NavBar.css';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import Search from '../Search/Search';
import message from '../../img/navImg/message.svg';


class NavBar extends Component {

    onChatIconClickHandler = () => {
        store.dispatch({
            type: 'SET_CHAT',
            payload: true
        })
    }



    render() {

        return (
            <header className='Toolbar'>
                <nav className='ToolbarNavigation'>
                    <div className='HamBurgerWrapper'>
                        <DrawerToggleButton clicked={this.props.clicked} />
                    </div>
                    <div className='SearchWrapper'>
                        <Search />
                    </div>
                    <div className='Spacer'></div>
                    <div className='ChatIconWrapper' onClick={this.onChatIconClickHandler}>
                        <div className='ImageEnclosure'>
                            <img className='AuthMessageIcon' src={message} alt='Message icon of ridea' onClick={this.onChatIconClickHandler} />
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}

NavBar.propTypes = {
    nav: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    nav: state.nav
});


export default connect(mapStateToProps)(NavBar);
