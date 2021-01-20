const router = require('express').Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { User } = require('../models/User');

const saltRounds = 10;

// При регистрации сначала проверка, есть ли уже такой email. Потом создается пользователь 
router.post('/signup', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.send({ error: 'Email already in use' });
    } else {
      const newUser = await User.create({
        name, email,
        password: await bcrypt.hash(password, saltRounds)
      });
      res.send({ newUser });
    }
  } catch (error) {
    next(error)
  }
});

// Сначала проверка пользователя по login, находится по БД. Если не совпадают пароль или email, то ошибка
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        res.send({ user });
      } else {
        res.send({ error: 'Invalid email or password' });
      }
    } else {
      res.send({ error: 'Invalid email or password' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
