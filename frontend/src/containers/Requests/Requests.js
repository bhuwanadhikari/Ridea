import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';
import store from '../../redux/store/store';
import Toast from '../../ui/Toast/Toast';
import { poleData } from '../../redux/actions/action';
import './Requests.css';
import { connect } from 'react-redux';
import { ToastsContainer, ToastsStore } from 'react-toasts';


class Requests extends Component {





  componentDidMount() {

  }


  onShowRouteHandler = (index) => {

    store.dispatch({
      type: 'SET_RESPONSE_PROGRESS',
      payload: 'REQUEST_IS_SHOWING'
    })

    store.dispatch({
      type: 'SET_ACTIVE_DIRECTION',
      payload: this.props.bell.requestedByPopulated[index]
    })

    this.props.setNotificationModal(false);

  }

  onCancelHandler = () => {
    store.dispatch({
      type: 'SET_RESPONSE_PROGRESS',
      payload: 'NOTIFIEDBY_IS_FETCHED'
    })
    store.dispatch({
      type: 'SET_ACTIVE_DIRECTION',
      payload: null
    })
    store.dispatch({
      type: 'SET_RESPONDED_ROUTES',
      payload: []
    })
  }

  onSubmitHandler = async () => {
    //post to backend
    console.log("Submit has been clicked")
    const { respondedRoutes } = this.props.bell;
    await this.props.poleData();
    if (this.props.bell.shared.with) {
      ToastsStore.success("Try again after few seconds");
      return;
    }

    if (respondedRoutes.length > 0) {
      await axios
        .post('/api/notifications/respond', { respondedRoutes })
        .then((result) => {
          console.log("Output of the submit is:", result.data);
          store.dispatch({
            type: 'SET_RESPONSE_PROGRESS',
            payload: 'NOTIFIEDBY_IS_FETCHED'
          })
          store.dispatch({
            type: 'SET_ACTIVE_DIRECTION',
            payload: null
          })
          store.dispatch({
            type: 'SET_RESPONDED_ROUTES',
            payload: []
          })
        }).catch((err) => {
          console.log(err);
        });


      if (respondedRoutes.find(el => el.responseStatus === 'Accepted')) {
        ToastsStore.success("Visit chat page to chat with Ride Partner")
      }

    } else {
      store.dispatch({
        type: 'SET_RESPONSE_PROGRESS',
        payload: 'NOTIFIEDBY_IS_FETCHED'
      })
      store.dispatch({
        type: 'SET_ACTIVE_DIRECTION',
        payload: null
      })
      store.dispatch({
        type: 'SET_RESPONDED_ROUTES',
        payload: []
      })
      ToastsStore.success("Nothing is submitted");
    }
  }

  render() {



    const { requestedByPopulated, respondedRoutes, activeDirection } = this.props.bell;

    return (
      <div className="NotificationsContainer">
        {
          requestedByPopulated && requestedByPopulated.map((item, index) => {
            console.log("REsonses sateatu sof the itemi is", item.responseStatus);
            let stateOfRequest = "Pending";
            var bufferRoute = respondedRoutes.find(aRoute => aRoute.owner === item.owner)
            if (bufferRoute) {
              if (bufferRoute.responseStatus === 'Accepted') {
                stateOfRequest = 'Accepted';
              }
              if (bufferRoute.responseStatus === 'Rejected') {
                stateOfRequest = "Rejected"
              }
            }
            return (
              <div className="NotificationWrapper" key={index}>
                <div className="SN">{stateOfRequest}</div>
                <div className="Name">{item.name}</div>
                <div className="View"
                  onClick={() => this.onShowRouteHandler(index)}
                >
                  Show Route
                </div>
              </div>
            )
          })
        }

        <div className="BellFooter">
          <button onClick={this.onSubmitHandler}>Submit </button>
          <ToastsContainer store={ToastsStore} lightBackground />


          <button onClick={this.onCancelHandler}>Cancel </button>
        </div>
      </div>

    )
  }

}

Requests.propTypes = {
  bell: PropTypes.object.isRequired,
  poleData: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  bell: state.bell
})

export default connect(mapStateToProps, { poleData })(Requests);
