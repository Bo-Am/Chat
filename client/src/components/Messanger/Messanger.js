import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Messanger.scss';
import io from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';
import JoinRoom from '../JoinRoom/JoinRoom';
import Message from '../Message/Message';
import { fetchSendMessageAC, sendMessageAC } from '../../redux/action-creator';

let socket;

function Messanger() {

  const [text, setText] = useState('');

  const ENDPOINT = 'localhost:5000';

  const { room, user } = useSelector(state => state);

  const dispatch = useDispatch();

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.emit('join', { name: user, room }, () => {

    });

    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on('message', ({ message }) => {
      if (message.user._id === user._id) {
        return;
      } else {
        dispatch(sendMessageAC(message));
      }
    })
  }, [room.messages])

  const handleChange = (e) => {
    const { value } = e.target;
    setText(value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.trim() === '') {
      return;
    } else {
      const fetchSendMessage = fetchSendMessageAC(user, room._id, text, socket);
      setText('');
      await fetchSendMessage(dispatch);
    }
  }
// const outMessage = {
//   flexStart,
//   background: "#d1d646",
// }


  return (
    <div className="messanger">
      <ScrollToBottom className="messanger__text-field">
        {
          room.messages.length
            ? room.messages.map(message => {
              return (
                <div className={"messanger__message-wrapper " + (message.user._id === user._id ? "flexEnd" : "flexStart")}>
                  <div className={"messanger__message-container"}>
                    <Message key={message._id} name={message.user.name} text={message.text} date={message.date} />
                  </div>
                </div>
              )
            })
            : null
        }
      </ScrollToBottom>
      <div className="messanger__input-field">
        {
          room.users.find(el => el._id === user._id)
            ? <form className="messanger__form" onSubmit={handleSubmit}>
                <input className="messanger__input" type="text" placeholder="Type your message..." onChange={handleChange} value={text} required />
                <button className="messanger__btn" type="submit">
                Enter
                </button>
              </form>
            : <JoinRoom />
        }
      </div>
    </div>
  )
}

export default Messanger;
