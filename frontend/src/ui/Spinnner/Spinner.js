import React from 'react';
import spinner from './spinner.gif';

export default () => {
   return (
      <div style = {{width: '100vw', height: '100vh'}}>
         <img
            src={spinner}
            style={{ width: '75px', margin: 'auto', position: 'fixed', top: 'calc(50% - 35.5px)', left: 'calc(50% - 35.5px)', display: 'block' }}
            alt="Loading..."
         />
      </div>
   );
};
