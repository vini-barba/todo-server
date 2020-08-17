const mongoose = require('mongoose');

const { Schema } = mongoose;
const NotificatioSubscriptionSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    index: true,
  },
  subscriptions: [
    {
      endpoint: String,
      expirationTime: String,
      keys: {
        p256dh: String,
        auth: String,
      },
    },
  ],
});

module.exports = mongoose.model('NotificatioSubscriptions', NotificatioSubscriptionSchema);
