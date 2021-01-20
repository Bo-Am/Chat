import { ADD_USER, ADD_ROOM, ADD_AVAILABLE_ROOM, ADD_ERROR, JOIN_ROOM, DISCONNECT, SEND_MESSAGE } from './index';

export const addUserAC = (name) => ({
  type: ADD_USER,
  newUser: name
});

export const addRoomAC = (room) => ({
  type: ADD_ROOM,
  newRoom: room
});

export const disconnectAC = () => ({
  type: DISCONNECT,
  newRoom: null
})

export const addAvailableRoomAC = (room) => ({
  type: ADD_AVAILABLE_ROOM,
  newRoom: room
});

export const addErrorAC = (error) => ({
  type: ADD_ERROR,
  newError: error
});

export const joinRoomAC = (user, roomId) => ({
  type: JOIN_ROOM,
  newUser: user,
  roomId,
});


export const sendMessageAC = (message) => ({
  type: SEND_MESSAGE,
  newMessage: message
});

// fetch запрос POST при регистрации пользователя - отправляются данные name, email, password пользователя
export const fetchNewUserAC = (name, email, password) => {
  return async (dispatch) => {
    const response = await fetch('http://localhost:5000/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password }),
    });
    const result = await response.json();
    if (result.newUser) {
      dispatch(addUserAC(result.newUser));
    } else {
      dispatch(addErrorAC(result.error));
    }
  }
}

// fetch запрос POST при авторизации пользователя - отправляются данные email, password пользователя
export const fetchLoginAC = (email, password) => {
  return async (dispatch) => {
    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json();
    // debugger
    if (result.user) {
      dispatch(addUserAC(result.user));
    } else {
      dispatch(addErrorAC(result.error));
    }
  }
}
// fetch запрос POST при создании комнаты - отправляется название, id пользователя
export const fetchNewRoomAC = (name, userId) => {
  return async (dispatch) => {
    const response = await fetch('http://localhost:5000/rooms/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, userId })
    });
    const result = await response.json();
    dispatch(addRoomAC(result.newRoom));
  }
}

// fetch запрос GET на получение всех доступных комнат
export const fetchAllRoomsAC = () => {
  return async (dispatch) => {
    const response = await fetch('http://localhost:5000/rooms/', {
      method: 'GET',
    });
    const result = await response.json();
    // debugger
    if (!result.rooms.length) {
      return;
    }
    for (let i = 0; i < result.rooms.length; i ++) {
      dispatch(addAvailableRoomAC(result.rooms[i]));
    }
  }
}
// fetch запрос на добавление пользователя к определенной комнате, передается сам пользователь и id комнаты
export const fetchJoinRoomAC = (user, roomId) => {
  return async (dispatch) => {
    const response = await fetch('http://localhost:5000/rooms/room/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: user._id, roomId }),
    });
    if (response.ok) {
      dispatch(joinRoomAC(user, roomId));
    }
  }
}

// fetch запрос на отправление сообщения
export const fetchSendMessageAC = (user, roomId, text, socket) => {
  return async (dispatch) => {
    const response = await fetch('http://localhost:5000/rooms/room/message', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user, roomId, text }),
      // debugger
    });
    const result = await response.json();
    if (result.message) {
      dispatch(sendMessageAC(result.message));
      // debugger
      socket.emit('message', result.message, () => {
        console.log('message sent');
      })
    }
  }
}
