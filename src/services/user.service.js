const userModel = require('../models/users.model');

const create = async (userData) => {
  try {
    return userModel.create(userData);
  } catch (error) {
    throw new Error('Error creating user');
  }
};

const read = async (userFilter) => {
  try {
    return userModel.findOne(userFilter);
  } catch (error) {
    throw new Error('Error reading user');
  }
};

const deleteOne = async (userId) => {
  try {
    return userModel.deleteOne({ _id: userId });
  } catch (error) {
    throw new Error('Error deleting user');
  }
};

module.exports = {
  create,
  read,
  deleteOne,
};
