import React from 'react'
import PropTypes from 'prop-types';
import ArrowBack from '../../../img/SidebarImg/arrow-pointing-to-right.svg';
import Auxi from '../../../hoc/Auxi';
import store from '../../../redux/store/store';
import './BackButton.css';
import { connect } from 'react-redux';

function BackButton(props) {
    return (
        <Auxi>
            <img
                className="ArrowBack BackButton"
                src={ArrowBack}
                alt="back button of ridea"
                onClick={() => {
                    store.dispatch({
                        type: 'SET_CHAT',
                        payload: false
                    })
                }}
            />
        </Auxi>
    )
}

BackButton.propTypes = {
    nav: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    nav: state.nav
})
export default connect(mapStateToProps)(BackButton);
