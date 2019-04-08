const mongoose = require("../services/db"),
  Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  params: { type: String },
  price: { type: Number },
  img: { type: String }
});

module.exports = mongoose.model("Product", ProductSchema);
