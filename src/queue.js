require('dotenv/config');

const Queue = require('./services/queue.service');

Queue.process();
