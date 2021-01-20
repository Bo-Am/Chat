const router = require('express').Router();
const mongoose = require('mongoose');
const moment = require('moment');
const { Room } = require('../models/Room');
const { User } = require('../models/User');
const { Message } = require('../models/Message');
// находим все комнаты в БД
router.get('/', async (req, res, next) => {
  try {
    const rooms = await Room.find({});
    res.send({ rooms });
  } catch (error) {
    next(error);
  }
});
// Создаем новую комнату, когда пользователь создал
router.post('/', async (req, res, next) => {
  try {
    const { name, userId } = req.body;
    const user = await User.findOne({ _id: userId });
    console.log(user);
    const newRoom = await Room.create({ name, host: userId, users: [user] });
    res.send({ newRoom });
  } catch (error) {
    next(error);
  }
});
// Добавляем в команту пользователя, который подключился к ней
router.put('/room/user', async (req, res, next) => {
  try {
    const { userId, roomId } = req.body;
    const user = await User.findOne({ _id: userId });
    const updated = await Room.updateOne({ _id: roomId }, { $push: { users: user } });
    if (updated.nModified > 0) {
      res.sendStatus(200);
    } else {
      res.send({ error: 'Something went wrong... Try again' });
    }
  } catch (error) {
    next(error);
  }
});
// Добавляем в комнате поле сообщение, с датой
router.put('/room/message', async (req, res, next) => {
  try {
    const { user, roomId, text } = req.body;
    const date = moment(new Date()).format('LTS');
    const message = await Message.create({
      text,
      user,
      date
    });
    const updated = await Room.updateOne({ _id: roomId }, { $push: { messages: message } });
    if (updated.nModified > 0) {
      res.send({ message });
    } else {
      res.send({ error: 'Error' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
