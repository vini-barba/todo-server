const notificationSubscriptionService = require('../services/notificationSubscription.service');

const addNotificationSubscription = async (subscriptionData) => {
  const { userId, subscription } = subscriptionData;
  const existingSubscriptions = await notificationSubscriptionService.read(userId);
  if (existingSubscriptions !== null) {
    const subscriptionList = existingSubscriptions
      .subscriptions.filter(
        (sub) => sub.endpoint !== subscription.endpoint,
      );

    subscriptionList.push(subscription);

    return notificationSubscriptionService.update(
      userId,
      subscriptionList,
    );
  }

  return notificationSubscriptionService.create(
    userId,
    subscription,
  );
};

module.exports = {
  addNotificationSubscription,
};
