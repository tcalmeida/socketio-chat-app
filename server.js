const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const formatMessage = require('./utils/formatMessage');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

const adminText = 'SimpleBot';

//when client connects
io.on('connection', (socket) => {
  socket.emit(
    'msgToClient',
    formatMessage(adminText, 'Welcome! Have a nice chat!')
  );

  socket.broadcast.emit(
    'msgToClient',
    formatMessage(adminText, 'A new user has joined')
  );

  socket.on('disconnect', () => {
    io.emit('msgToClient', formatMessage(adminText, 'User disconnected'));
  });

  socket.on('userChatMessage', (userMsg) => {
    io.emit('msgToClient', formatMessage('USER', userMsg));
  });
});

server.listen(3000, () => {
  console.log('Server running on port: 3000');
});
