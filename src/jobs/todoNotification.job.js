const webpush = require('web-push');

webpush.setVapidDetails(
  process.env.MAILTO_WEBPUSH,
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY,
);

module.exports = {
  key: 'TodoNotification',
  handle: async ({ data }) => {
    const { subscriptions, todo } = data;

    const notificationPayload = {
      notification: {
        title: 'To-do ',
        options: {
          body: todo.text,
          data: {
            urlToOpen: '/',
          },
        },
      },
    };

    const promisesToResolve = subscriptions.map((subscription) => webpush.sendNotification(
      {
        endpoint: subscription.endpoint,
        expirationTime: subscription.expirationTime,
        keys: {
          p256dh: subscription.keys.p256dh,
          auth: subscription.keys.auth,
        },
      },
      JSON.stringify(notificationPayload),
      { TTL: 60 },
    ));

    return Promise.allSettled(promisesToResolve);
  },
};
