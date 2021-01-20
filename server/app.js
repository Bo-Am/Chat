const express = require('express');
const useMiddleware = require('./middleware/index');
const useErrorHandlers = require('./middleware/error-handlers');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const roomsRouter = require('./routes/rooms');

const app = express();
useMiddleware(app);

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/rooms', roomsRouter);

useErrorHandlers(app);

module.exports = app;
