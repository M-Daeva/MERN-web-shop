const mongoose = require("../services/db"),
  Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  img: { type: String }
});

module.exports = mongoose.model("Product", ProductSchema);
