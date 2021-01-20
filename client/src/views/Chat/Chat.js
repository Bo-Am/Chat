import React from 'react';
import './Chat.scss';
import { useSelector } from 'react-redux';
import RoomList from '../../components/RoomList/RoomList';
import UsersPanel from '../../components/UsersPanel/UsersPanel';
import Welcome from '../Welcome/Welcome';
import Messanger from '../../components/Messanger/Messanger';

function Chat() {

  const { room, user } = useSelector(state => state);

  return (
    <div className="chat">
      <div className="chat__side-panel">
        {/* Если комната есть, то показывается список доступных комнат или создать новую комнату*/}
      {
          room
            ? <UsersPanel />
            : <RoomList />
        }
      </div>
      <div className="chat__main">
        {
          room
            ? <Messanger />
            : <Welcome user={user} />
        }
      </div>
    </div>
  )
}

export default Chat;
