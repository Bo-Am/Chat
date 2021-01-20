const mongoose = require('mongoose');
const { messageSchema } = require('./Message');
const { userSchema } = require('./User');

// У модели "Комната" будет название, участники комнаты в виде массива, кто создал комнату(админ), и сообщения в виде массива
const roomSchema = new mongoose.Schema({
  name: String,
  users: [userSchema],
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  messages: [messageSchema],
});

const Room = mongoose.model('Room', roomSchema);

module.exports = {
  Room,
  roomSchema
};
