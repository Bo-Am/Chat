// доступные комнаты
import React, { useEffect } from 'react';
import Room from '../Room/Room';
import SidePanelHead from '../SidePanelHead/SidePanelHead';
import { useDispatch, useSelector } from 'react-redux';
import './RoomsList.scss';
import roomsIcon from '../../img/message.png';
import { addRoomAC, fetchAllRoomsAC } from '../../redux/action-creator';

function RoomsPanel() {

  
  const dispatch = useDispatch();
  
  const { availableRooms } = useSelector(state => state);
  
  useEffect(() => {
      const fetchAllRooms = fetchAllRoomsAC();
      fetchAllRooms(dispatch);
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    const { target } = e;
    const id = target.closest('a').getAttribute('data-index')
    const room = availableRooms.find(el => el._id === id);
    dispatch(addRoomAC(room));
  }

  return (
    <div className="rooms-panel">
      <div className="head">
        <SidePanelHead icon={roomsIcon} name="Rooms" />
      </div>
      { 
        availableRooms.length
          ? availableRooms.map(room => {
              return (
                <a href="#" onClick={handleClick} data-index={room._id}> 
                  <div className="rooms-panel__room" >
                    <Room key={room._id} title={room.name} />
                  </div>
                </a>
              )
            })
          : null
      }
    </div>
  )
}

export default RoomsPanel;
