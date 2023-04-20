const socket = io();

socket.on('msgToClient', (message) => {
    console.log(message)
} )