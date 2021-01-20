const mongoose = require('mongoose');
const { userSchema } = require('./User');
// У модели сообщения будет только сам контент(текст), кто написал, и дата, когда написано сообщение
const messageSchema = new mongoose.Schema({
  text: String,
  user: userSchema,
  date: String
});

const Message = mongoose.model('Message', messageSchema);

module.exports = {
  Message,
  messageSchema
}
