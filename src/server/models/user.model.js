const mongoose = require("../services/db-service"),
  Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  info: { type: String }
});

module.exports = mongoose.model("User", UserSchema);
