import React, {Component} from 'react';
import Button from '../../ui/Button/Button';
import Modal from '../../ui/Modal/Modal';
import InputField from '../../ui/InputField/InputField';

import './Login.css';
import {NavLink} from 'react-router-dom';


class Login extends Component{
   constructor(){
      super();
      this.state = {
         email: '',
         password: '',
         errors: {}
      }
   }

   onChangeHandler = (e) => {
      this.setState({[e.target.name] : e.target.value});

      const newErr = {...this.state.errors};
      newErr[e.target.name] = '';
      this.setState({errors: newErr});
   };

   onLoginHandler = (e) => {
      e.preventDefault(); //prevents from default submission
      const userData = {
         email: this.state.email,
         password: this.state.password
      };
      console.log('userData')
   };

   


   render(){
      return (
         <div className= "FormBox">
            <Modal/>

            <form className="Form" noValidate>

               <InputField
                  className="Input"
                  type="email"
                  placeholder = "Email"
                  changed = {this.onChangeHandler}
                  name = "email"
                  value = {this.state.email}
                  errors = {this.state.errors}
               />
               <InputField
                  className="Input"
                  type="password"
                  placeholder = "Password"
                  changed = {this.onChangeHandler}
                  name = "password"
                  value = {this.state.password}
                  errors = {this.state.errors}
               />
            </form>

            <Button cls = "Success" clicked={this.onLoginHandler} >Log In</Button>

            <div className="InfoBar">
               <a href= '#'>Sign Up! If you are new to Ridea</a>
            </div>
         </div>
      )
   }
}


export default Login;
