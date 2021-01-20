import React from 'react';
import './Message.scss';

function Message({ name, text, date }) {
  return (
    <div className="message">
      <p className="from-me">{text}</p>
      <span>{date}</span>
      <br/>
      <span>{name}</span>
    </div>
    
  )
}

export default Message;
