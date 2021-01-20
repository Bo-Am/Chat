import React from 'react';
import './Error.scss';

function Error({error}) {
  return (
    <div className="error-container">
      <h4>Error</h4>
      <span>{error}</span>
    </div>
  )
}

export default Error;
