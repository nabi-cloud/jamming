import React from 'react';

import loader from './loader-gif.gif';
import './Loader.css';

function Loader() {
  return (
    <div className='Loader-Container'>
      <div>
        <img className='Loader' src={ loader } alt='Loading' />
      </div>

    </div>
  );
};

export default Loader;
