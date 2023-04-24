const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const formatMessage = require('./utils/formatMessage');
const { enterUser, getUser } = require('./utils/controlUser');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

const adminText = 'SimpleBot';

io.on('connection', (socket) => {
  socket.on('enterRoom', ({ username, room }) => {
    const user = enterUser(socket.id, username, room);
    socket.join(user.room);

    socket.emit(
      'msgToClient',
      formatMessage(adminText, 'Welcome! Have a nice chat!')
    );

    socket.broadcast
      .to(user.room)
      .emit(
        'msgToClient',
        formatMessage(adminText, `${user.username} has joined the room`)
      );
  });

  socket.on('disconnect', () => {
    io.emit('msgToClient', formatMessage(adminText, `user disconnected`));
  });

  socket.on('userChatMessage', (userMsg) => {
    const user = getUser(socket.id);
    console.log(user);
    io.to(user.room).emit('msgToClient', formatMessage(user.username, userMsg));
  });
});

server.listen(3000, () => {
  console.log('Server running on port: 3000');
});
