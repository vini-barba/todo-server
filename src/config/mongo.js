const mongoose = require('mongoose');

// const uri = `mongodb+srv://dbUser:<password>@todo-00.ile9h.mongodb.net/<dbname>?retryWrites=true&w=majority`;
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@todo-00.ile9h.mongodb.net/todo?retryWrites=true&w=majority`;

const db = mongoose.connect(uri, { useNewUrlParser: true });

module.exports = db;
