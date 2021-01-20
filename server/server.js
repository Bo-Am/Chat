const http = require('http');
const app = require('./app');
const socketio = require('socket.io');
const { addUser, getUser } = require('./middleware/users');

const port = process.env.PORT || 5000;

const server = http.createServer(app);

const io = socketio(server);

// подключение к комнате, отправление сообщения, принятие нового сообщения и отключение от чата
io.on('connection', (socket) => {
  console.log('USER CONNECTED');
  socket.on('join', ({ name, room }, callback) => {
    const user = addUser({ id: socket.id, name, room });
    
    socket.join(user.room);

    callback();
  });

  socket.on('message', (message, callback) => {
    const user = getUser(socket.id);
    console.log(message);
    // По такому выражению можно излучать в сокет по  конкретному идентификатору(user.room):
    io.to(user.room).emit('message', { message });

    callback();
  });

  socket.on('disconnect', () => {
    console.log('USER LEFT THE CHAT');
  });
});

server.listen(port, () => console.log(`Server started at ${port}`));
