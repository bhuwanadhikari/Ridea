import React from 'react';
import './Button.css';

const  Button = ({clicked, dataMessage, children, cls}) => {
   const myClasses = `${cls.toString()} Btn`;
   return (
      <button
         type="button"
         data-message = {dataMessage}
         className={myClasses}
         onClick={clicked}
      >
         {children}
      </button>
   )
};
Button.propTypes = {
};
export default Button;