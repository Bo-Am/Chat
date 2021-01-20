import React, { useState } from 'react';
import './Welcome.scss';
import CreateRoom from '../CreateRoom/CreateRoom';

function Welcome({ user }) {

  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  }

  return (
    <div className="greet-container">
    {
        show
          ? <div className="greet-container__modal"><CreateRoom handleClick={handleClick} /></div>
          : null
      }
    <div className={show ? "greet greet_blur": "greet"}>
      <h1>Select an available rooms or create your own.</h1>
      <button className="greet_btn" onClick={handleClick}><span class="noselect">Create a room</span><div id="circle"></div></button>
    </div>
    </div>
  )
}

export default Welcome;
