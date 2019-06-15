import React from 'react';
import spinner from '../../../img/spinner.gif';

export default () => {
   return (
      <div style = {{width: '100vw', height: '100vh'}}>
         <img
            src={spinner}
            style={{ width: '200px', margin: 'auto', display: 'block' }}
            alt="Loading..."
         />
      </div>
   );
};
