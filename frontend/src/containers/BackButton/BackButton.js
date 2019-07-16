import React from 'react'
import PropTypes from 'prop-types';
import ArrowBack from '../../img/SidebarImg/arrow-pointing-to-right.svg';
import store from '../../redux/store/store';
import './BackButton.css';
import { connect } from 'react-redux';

function BackButton(props) {
    return (
        <div className="BackButton">
            <img
                className="ArrowBack"
                src={ArrowBack}
                alt="back button of ridea"
                onClick={() => {
                    store.dispatch({
                        type: 'SET_CHAT',
                        payload: false
                    })
                }}
            />

        </div>
    )
}

BackButton.propTypes = {
    nav: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    nav: state.nav
})
export default connect(mapStateToProps)(BackButton);
