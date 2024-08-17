require('dotenv').config();
const {mongoose} = require('mongoose');

console.log("attempting to connect to db")

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("connected to db"))
.catch((err) => console.log(err));

const db = mongoose.connection;

module.exports = db;