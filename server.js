const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

//when client connects
io.on('connection', (socket) => {
  socket.emit('msgToClient', 'Welcome! Have a nice chat!');

  socket.broadcast.emit('msgToClient', 'A new user has joined');

  socket.on('disconnect', () => {
    io.emit('msgToClient', 'User disconnected');
    
  });
});

server.listen(3000, () => {
  console.log('Server running on port: 3000');
});
