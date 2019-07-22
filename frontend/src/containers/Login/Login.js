import React, { Component } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Button from '../../ui/Button/Button';
import Modal from '../../ui/Modal/Modal';
import InputField from '../../ui/InputField/InputField';
import setAuthToken from '../../utils/setAuthToken';
import store from '../../redux/store/store';
import {withRouter} from 'react-router-dom'

import './Login.css';


class Login extends Component {
   constructor() {
      super();
      this.state = {
         email: '',
         password: '',
         errors: {}
      }
   }

   onChangeHandler = (e) => {
      this.setState({ [e.target.name]: e.target.value });

      const newErr = { ...this.state.errors };
      newErr[e.target.name] = '';
      this.setState({ errors: newErr });
   };

   onLoginHandler = (e) => {
      e.preventDefault(); //prevents from default submission
      const userData = {
         email: this.state.email,
         password: this.state.password
      };
      axios
         .post('/auth/login', userData)
         .then(res => {
            localStorage.setItem('jwtToken', res.data.token);
            setAuthToken(res.data.token);
            const decoded = jwtDecode(res.data.token);
            store.dispatch({ type: 'SET_USER', payload: decoded });
            if(store.getState().auth.isAuthenticated){
               this.props.history.push('/home');
            }
         })
         .catch(err => {
            this.setState({ errors: err.response.data });
         });

   };

   componentDidUpdate(prevProps, prevState) {
      if (prevProps.showModal !== this.props.showModal) {
         this.setState({
            email: '',
            password: '',
            errors: {}
         })
      }
   }





   render() {
      return (
         <div className="FormBox">
            <Modal />

            <form className="Form" noValidate>

               <InputField
                  className="Input"
                  type="email"
                  placeholder="Email"
                  changed={this.onChangeHandler}
                  name="email"
                  value={this.state.email}
                  errors={this.state.errors}
               />
               <InputField
                  className="Input"
                  type="password"
                  placeholder="Password"
                  changed={this.onChangeHandler}
                  name="password"
                  value={this.state.password}
                  errors={this.state.errors}
               />
            </form>

            <Button cls="Success" clicked={this.onLoginHandler} >Log In</Button>

            <div className="InfoBar">
               <a href='/'>Sign Up! If ure new to Ridea</a>
            </div>
         </div>
      )
   }
}


export default withRouter(Login);
