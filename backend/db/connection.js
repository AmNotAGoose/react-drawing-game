const {mongoose} = require('mongoose');

console.log("attempting to connect to db")

mongoose.connect("mongodb://xxx:xxx@192.168.0.155:27018/game?directConnection=true&authSource=admin")
.then(() => console.log("connected to db"))
.catch((err) => console.log(err));

const db = mongoose.connection;

module.exports = db;