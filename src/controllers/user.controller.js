const userService = require('../services/user.service');

const addUser = async (userData) => {
  const { email } = userData;
  return userService.create({ email });
};

const getUser = async (email) => userService.read({ email });

const deleteUser = async (userId) => userService.deleteOne(userId);

module.exports = {
  addUser,
  getUser,
  deleteUser,
};
