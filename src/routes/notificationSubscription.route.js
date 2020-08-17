const router = require('express').Router();

const notificationSubscriptionController = require('../controllers/notificationSubscription.controller');

router.get('/notification/key', async (req, res) => res.send(process.env.PUBLIC_VAPID_KEY));
router.post('/notification/subscription', async (req, res) => {
  try {
    const subscritionData = req.body;
    await notificationSubscriptionController.addNotificationSubscription(subscritionData);
    return res.status(201).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
module.exports = router;
