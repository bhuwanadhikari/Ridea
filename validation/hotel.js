//Validation for the registration of hotels and hotelProfile
const validator = require('validator');
const isEmpty = require('./is-empty');
const Hotel = require('../models/Hotel');

module.exports = function validateRegisterInput(data){
   let errors = {};

   data.name = !isEmpty(data.name) ? data.name : ''; //data.name has to be string
   data.email = !isEmpty(data.email) ? data.email : '';

   if(validator.isEmpty(data.name)){
      errors.name = 'Name field should not be empty';
   } else {
      if(!validator.isLength(data.name, {min: 6, max: 48})){
         errors.name = 'Name must be between 6 and 45 characters';
      }
   }

   if(validator.isEmpty(data.email)){
      errors.email = 'Email field should not be empty';
   } else {
      if(!validator.isEmail(data.email)){
         errors.email = 'Invalid Email';
      }
   }

   //Validation from database
   Hotel.findOne({email: data.email}).then(hotel => {
      if(hotel){
         errors.email = 'Email already exists';
      }
   });







   return {
      errors,
      isValid: isEmpty(errors) //checks if error is empty
   };

};