const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.get('/user/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const user = await userController.getUser(email);
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
router.post('/user', async (req, res) => {
  try {
    const userData = req.body.user || {};
    const userCreated = await userController.addUser(userData);
    return res.json(userCreated);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.delete('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    await userController.deleteUser(userId);
    return res.json({ message: `User ${userId} deleted` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
module.exports = router;
