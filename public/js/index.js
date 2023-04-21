const chatRoomForm = document.getElementById('chat-form')
const socket = io();

socket.on('msgToClient', (message) => {
    console.log(message)
} )

chatRoomForm.addEventListener ('submit', (event) => {
    event.preventDefault();

    const userMsg = document.getElementById('msg').value
    console.log(userMsg)
})