const mongoose = require("../services/db"),
  Schema = mongoose.Schema;

const UserSchema = new Schema({
  login: { type: String },
  password: { type: String },
  cart: { type: Array },
  city: { type: String },
  email: { type: String },
  fingerprint: { type: String, required: true }
});

module.exports = mongoose.model("User", UserSchema);
