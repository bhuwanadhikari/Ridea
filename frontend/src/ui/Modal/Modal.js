import React, { Component } from 'react';

import  './Modal.css';
import Aux from '../../hoc/Auxi';
import BackDrop from '../BackDrop/BackDrop';


//takes props: children, fromTop, show and clicked
class Modal extends Component {

   



   render () {
      return (
         <Aux>
            <BackDrop show={this.props.show} clicked={this.props.modalClosed} />
            <div
               className="Modal"
               style={{
                  transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                  opacity: this.props.show ? '1' : '0',
                  top: this.props.fromTop
               }}>
               {this.props.children}
            </div>
         </Aux>
      )
   }
}

export default Modal;