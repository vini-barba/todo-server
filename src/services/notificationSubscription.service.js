const notificationSubscriptionModel = require('../models/notificationSubscriptions.model');

const create = async (userId, subscription) => {
  try {
    return notificationSubscriptionModel.create({
      user: userId,
      subscriptions: [subscription],
    });
  } catch (error) {
    throw new Error('Error creating notification subscritions');
  }
};

const update = async (userId, subscriptions) => {
  try {
    return notificationSubscriptionModel.findOneAndUpdate(
      { user: userId },
      {
        subscriptions,
      },
      { new: true },
    );
  } catch (error) {
    throw new Error('Error updating notification subscritions');
  }
};
const read = async (userId) => {
  try {
    return notificationSubscriptionModel.findOne({ user: userId });
  } catch (error) {
    throw new Error('Error reading notification subscritions');
  }
};

module.exports = {
  create,
  read,
  update,
};
