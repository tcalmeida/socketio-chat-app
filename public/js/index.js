const chatRoomForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

//parse url params
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();
socket.emit('enterRoom', { username, room });

socket.on('UsersOnRooms', ({ room, users }) => {
  ManageRoomName(room);
  ManageUserList(users);
});

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

