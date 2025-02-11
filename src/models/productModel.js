const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 30,
  },
  description: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 200,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 100,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
