import React from 'react';
import './BackDrop.css';

const BackDrop = (props) => {
   return props.show ? (<div onClick={props.clicked} className="BackDrop"></div>):null;
};

export default BackDrop;
