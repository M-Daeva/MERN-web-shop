const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

mongoose.set("useFindAndModify", false);

let UserSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  info: { type: String },
});

module.exports = mongoose.model("User", UserSchema);
