import { ADD_USER, ADD_ROOM, ADD_AVAILABLE_ROOM, ADD_ERROR, JOIN_ROOM, DISCONNECT, SEND_MESSAGE } from './action';

const initialState = {
  user: null,
  room: null,
  availableRooms: [],
  error: null,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return { ...state, user: action.newUser }

    case ADD_ROOM:
      return { ...state, room: action.newRoom }

    case ADD_AVAILABLE_ROOM:
      if (state.availableRooms.find(el => el._id === action.newRoom._id)) {
        return { ...state }
      } else {
        return { ...state, availableRooms: [...state.availableRooms, action.newRoom] }
      }

    case JOIN_ROOM:
      const room = state.availableRooms.find(room => room._id === action.roomId);
      const index = state.availableRooms.findIndex(room => room._id === action.roomId);
      room.users.push(action.newUser);
      const availableRoomsJoined = state.availableRooms.splice(index, 1, room);
      return { ...state, availableRooms: availableRoomsJoined }

    case SEND_MESSAGE:
      const updatedRoom = Object.assign({}, state.room);
      updatedRoom.messages.push(action.newMessage);
      return { ...state, room: updatedRoom }

    case ADD_ERROR:
      return { ...state, error: action.newError }

    case DISCONNECT:
      return { ...state, room: action.newRoom }
  
    default:
      return { ...state }
  }
}
