const mongoose = require("../dbAPI"),
  Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  info: { type: String },
});

module.exports = mongoose.model("User", UserSchema);
