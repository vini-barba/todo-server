const todoModel = require('../models/todos.model');

const create = async (todoData) => {
  try {
    return todoModel.create(todoData);
  } catch (error) {
    throw new Error('Error creating to-do');
  }
};

const read = async (user) => {
  try {
    return todoModel.find({ user });
  } catch (error) {
    throw new Error('Error reading to-do');
  }
};

const update = async (todoId, todoData) => {
  try {
    return todoModel.findByIdAndUpdate(
      { _id: todoId },
      todoData,
      { new: true },
    );
  } catch (error) {
    throw new Error('Error updating to-do');
  }
};

const deleteOne = async (todoId) => {
  try {
    return todoModel.deleteOne({ _id: todoId });
  } catch (error) {
    throw new Error('Error deleting to-do');
  }
};

module.exports = {
  create,
  read,
  update,
  deleteOne,
};
