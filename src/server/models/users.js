const mongoose = require("../services/db"),
  Schema = mongoose.Schema;

const UserSchema = new Schema({
  login: { type: String, required: true },
  password: { type: String, required: true },
  cart: { type: Array, required: true },
  city: { type: String, required: true },
  email: { type: String, required: true }
});

module.exports = mongoose.model("User", UserSchema);
