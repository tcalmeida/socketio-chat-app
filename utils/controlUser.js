const users = [];

function enterUser(id, username, room) {
  const user = { id, username, room };
  users.push(user);

  return user;
}

function getUser(id) {
  return users.find((user) => user.id === id);
}

function exitUser() {
  const userIndex = user.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    return users.splice(index, 1);
  }
}



module.exports = { enterUser, getUser, exitUser };
