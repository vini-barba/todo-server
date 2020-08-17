const Queue = require('bull');

const redisConfig = require('../config/redis');

const jobs = require('../jobs');

const queues = Object.values(jobs).map((job) => ({
  bull: new Queue(job.key, redisConfig),
  name: job.key,
  handle: job.handle,
}
));

module.exports = {
  queues,
  add: (name, data, options) => {
    const selectedQueue = queues.find((queue) => queue.name === name);

    if (!selectedQueue) {
      return null;
    }

    return selectedQueue.bull.add(data, options);
  },
  process: () => {
    queues.forEach((queue) => {
      queue.bull.process(queue.handle);
      queue.bull.on('failed', (job, err) => {
        console.log(job.name, job.data);
        console.log(err);
      });
    });
  },
  find: (name) => queues.find((queue) => queue.name === name),
};
