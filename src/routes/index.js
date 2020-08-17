const router = require('express').Router();

router.use(require('./todo.route.js'));
router.use(require('./user.route.js'));
router.use(require('./notificationSubscription.route.js'));

module.exports = router;
