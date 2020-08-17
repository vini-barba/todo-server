const router = require('express').Router();
const todoController = require('../controllers/todo.controller');

router.post('/todo', async (req, res) => {
  try {
    const todoData = req.body.todo || {};
    const todoAdded = await todoController.addTodo(todoData);
    return res.json(todoAdded);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get('/todo/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const todoList = await todoController.getTodos(userId);
    return res.json(todoList);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.put('/todo/:id', async (req, res) => {
  try {
    const todoId = req.params.id;
    const todoData = req.body.todo || {};
    const todoUpdated = await todoController.updateTodo(todoId, todoData);
    return res.json(todoUpdated);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.delete('/todo/:id', async (req, res) => {
  try {
    const todoId = req.params.id;
    await todoController.deleteTodo(todoId);
    return res.json({ message: `To-do ${todoId} deleted` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
