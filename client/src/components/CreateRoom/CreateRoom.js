import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CreateRoom.scss';
import { fetchNewRoomAC } from '../../redux/action-creator';

function CreateRoom({ handleClick }) {

  const [name, setName] = useState('');

  const { user } = useSelector(state => state);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fetchNewRoom = fetchNewRoomAC(name, user._id);
    await fetchNewRoom(dispatch);
  }

  const handleChange = (e) => {
    const { target } = e;
    setName(target.value);
  }

  return (
    // <div className="create-room">
    //   <form className="create-room__form" onSubmit={handleSubmit}>
    //     <input type="text" placeholder="Enter your room name..." value={name} onChange={handleChange} required />
    //     <button className="btn-submit" type="submit">Create</button>
    //     <button className="btn-cancel" onClick={handleClick}>Cancel</button>
    //   </form>
    // </div>
   <div className="cr-box">
   <h2>Create new Room!</h2>
   
     <form onSubmit={handleSubmit}>
     <div className="user-box">
       <label>Enter your room name...</label>
       <input type="text" value={name} onChange={handleChange} required />
     </div>
     <button className="btn" type="submit">Confirm</button>
     </form>
   </div>
  )
}




export default CreateRoom;
