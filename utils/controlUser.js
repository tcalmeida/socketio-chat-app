const users = [];

function enterUser(id, username, room) {
  const user = { id, username, room };

  users.push(user);
  return user;
}

function getUser (id) {
    return users.find((user) => user.id ===id)
}