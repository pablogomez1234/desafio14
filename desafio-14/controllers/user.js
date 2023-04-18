const { getAllUsers, addSingleUser, getUserById } = require('../dto/user');

const getUsers = async () => {
  const users = await getAllUsers();
  return users;
};

const addUser = async (user) => {
  if (user.name && user.lastname && user.dni) {
    const addedUser = addSingleUser(user);
    return addedUser;
  }

  throw new Error('Invalid user');
};

const getUser = async (id) => {
  const user = getUserById(id);
  return user;
}

module.exports = { getUsers, addUser, getUser };
