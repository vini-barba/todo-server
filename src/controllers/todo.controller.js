const todoService = require('../services/todo.service');
const notificationController = require('./notification.controller');
const Queue = require('../services/queue.service');

const addTodo = async (todoData) => {
  const { text, dueDate, user } = todoData;

  const todoCreated = await todoService.create({ text, dueDate, user });
  await notificationController.scheduleNotification(todoCreated);
  return todoCreated;
};

const getTodos = async (userId) => todoService.read(userId);

const updateTodo = async (todoId, todoData) => {
  const todoDataToUpDate = {};
  Object.entries(todoData).forEach(([key, value]) => {
    if (key === 'text') {
      todoDataToUpDate[key] = value;
    }
    if (key === 'checked') {
      todoDataToUpDate[key] = value;
    }
    if (key === 'dueDate') {
      todoDataToUpDate[key] = value;
    }
    return null;
  });

  const updatedTodo = await todoService.update(todoId, todoDataToUpDate);

  const TodoNotificationQueue = Queue.find('TodoNotification');
  const TodoNotificationJob = await TodoNotificationQueue.bull.getJobFromId(todoId);

  const notificationData = TodoNotificationJob.data;
  notificationData.todo = updatedTodo;
  await TodoNotificationJob.update(notificationData);

  return updatedTodo;
};

const deleteTodo = async (todoId) => {
  const TodoNotificationQueue = Queue.find('TodoNotification');
  const TodoNotificationJob = await TodoNotificationQueue.bull.getJobFromId(todoId);
  try {
    await TodoNotificationJob.remove();
  } catch (error) {
    console.log(error);
  }

  return todoService.deleteOne(todoId);
};

module.exports = {
  addTodo,
  getTodos,
  updateTodo,
  deleteTodo,
};
