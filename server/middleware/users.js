const users = [];

const addUser = ({ id, name, room }) => {
  const user = { id, name, room };
  users.push(user);
  return user;
}

const getUser = (id) => {
  return users.find(user => user.id === id);
}


module.exports = { addUser, getUser };
