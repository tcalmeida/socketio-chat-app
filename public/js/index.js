const chatRoomForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

//parse url params
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

console.log(username, room);

const socket = io();

socket.on('msgToClient', (message) => {
  displayMessage(message);

  chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatRoomForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const userMsg = document.getElementById('msg').value;
  socket.emit('userChatMessage', userMsg);

  document.getElementById('msg').value = '';
  document.getElementById('msg').focus();
});

function displayMessage(message) {
  const newDiv = document.createElement('div');
  newDiv.classList.add('message');
  newDiv.innerHTML = `
    <p class="meta">${message.username}<span>${message.time}</span></p>
            <p class="text">
              ${message.text}
            </p>`;
  document.querySelector('.chat-messages').appendChild(newDiv);
}
