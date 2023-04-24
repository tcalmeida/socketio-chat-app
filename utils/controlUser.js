const users = [];

function enterUser(id, username, room) {
  const user = { id, username, room };
  users.push(user);

  return user;
}

function getUser(id) {
  return users.find((user) => user.id === id);
}

function exitUser(id) {
  const userIndex = users.findIndex((user) => user.id === id);
  
  if (userIndex !== -1) {
    return users.splice(userIndex, 1)[0];
  }
}

function getRoomUsers(room) {
    return users.filter((user) => user.room === room);
  }

module.exports = { enterUser, getUser, exitUser, getRoomUsers };
