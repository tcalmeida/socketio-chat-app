const users = []

function enterUser (id, username, room) {
const user =  {id, username, room}

users.push(user);
return user;
}