const mongoose = require("mongoose"),
  user = require("./routes/user.route"),
  dbURL = "mongodb://fewed:26853141q@ds117158.mlab.com:17158/mern-web-shop";

mongoose.connect(dbURL, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

module.exports = { user };