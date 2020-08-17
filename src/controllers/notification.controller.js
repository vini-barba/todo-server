const notificationSubscriptionService = require('../services/notificationSubscription.service');
const Queue = require('../services/queue.service');

const scheduleNotification = async (todoData) => {
  const notificationSubscription = await notificationSubscriptionService.read(todoData.user);
  if (notificationSubscription === null) {
    return;
  }
  if (notificationSubscription.subscriptions.lenght === 0) {
    return;
  }
  const { subscriptions } = notificationSubscription;

  const delay = todoData.dueDate.getTime() - (new Date()).getTime();
  if (delay <= 0) {
    return;
  }
  Queue.add('TodoNotification', {
    subscriptions,
    todo: todoData,
  }, {
    delay,
    jobId: todoData._id,
  });
};

module.exports = {
  scheduleNotification,
};
