const mongoose = require("mongoose");

const wishListItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

const wishListItem = mongoose.model("wishListItem", wishListItemSchema);
module.exports = wishListItem;
