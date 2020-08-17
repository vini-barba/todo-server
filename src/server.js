/* eslint-disable no-console */
require('dotenv/config');
const app = require('./app');
require('./config/mongo');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Application listen on port ${PORT}!`);
});
