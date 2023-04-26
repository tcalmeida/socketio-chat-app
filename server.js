const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const formatMessage = require('./utils/formatMessage');
const { enterUser, getUser, exitUser, getRoomUsers } = require('./utils/controlUser');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

const adminText = 'ElementalBot';

io.on('connection', (socket) => {
  socket.on('enterRoom', ({ username, room }) => {
    const user = enterUser(socket.id, username, room);
    socket.join(user.room);

    socket.emit(
      'msgToClient',
      formatMessage(adminText, `Welcome ${user.username}! Have a nice chat!`)
    );

    socket.broadcast
      .to(user.room)
      .emit(
        'msgToClient',
        formatMessage(adminText, `${user.username} has joined the room`)
      );

    io.to(user.room).emit('UsersOnRooms', {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  socket.on('disconnect', () => {
    const user = exitUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        'msgToClient',
        formatMessage(adminText, `${user.username} disconnected`)
      );
      io.to(user.room).emit('UsersOnRooms', {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });

  socket.on('userChatMessage', (userMsg) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('msgToClient', formatMessage(user.username, userMsg));
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.info(
    `Server running on port: ${
      typeof process.env.PORT === 'string' ? process.env.PORT : 3000
    } `
  );
});
