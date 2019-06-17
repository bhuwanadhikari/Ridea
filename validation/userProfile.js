const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateUserProfileInput(data){
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';



    if(validator.isEmpty(data.handle)){
        errors.handle = 'Username is required';
    }

    if(!isEmpty(data.handle)) {
       if (!validator.isLength(data.handle, {min: 4, max: 40})) {
          errors.handle = 'Username should be 4 to 40 characters long';
       }
    }




    //check for the social links
    if(!isEmpty(data.facebook)){
        if(!validator.isURL(data.facebook)){
            errors.facebook = 'URL you entered is not valid';
        }
    }
    if(!isEmpty(data.twitter)){
        if(!validator.isURL(data.twitter)){
            errors.twitter = 'URL you entered is not valid';
        }
    }
    if(!isEmpty(data.linkedIn)){
        if(!validator.isURL(data.linkedIn)){
            errors.linkedIn = 'URL you entered is not valid';
        }
    }
    if(!isEmpty(data.instagram)){
        if(!validator.isURL(data.instagram)){
            errors.instagram = 'URL you entered is not valid';
        }
    }

    return {
        errors,
        isValid: isEmpty(errors) //checks if error is empty
    };

};