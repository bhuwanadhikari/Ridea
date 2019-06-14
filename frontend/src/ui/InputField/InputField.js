import React from 'react';
import Auxi from '../../hoc/Auxi';


import './InputField.css';

const InputField = ({autofocus, type, name, value, changed, placeholder, errors, extraCls}) => {

   if(name==='bio'){
      return(
         <Auxi>
            <textarea
               className={`TextArea InputField ${extraCls}`}
               rows={4}
               cols={30}
               name={name}
               value = {value}
               onChange={changed}
               placeholder={placeholder}
            />
            {errors[name]? (<div className="errorFeedback">{errors[name]}</div>):null}
         </Auxi>
      )
   } else {
      return (
         <Auxi>
            <input
               className={`InputField ${extraCls}`}
               type={type}
               name={name}
               value={value}
               onChange={changed}
               placeholder={placeholder}
            />

            {errors[name] ? (<div className="errorFeedback">{errors[name]}</div>) : null}
         </Auxi>


      );
   }
};

export default InputField;
