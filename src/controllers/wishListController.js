const wishlListItem = require("../models/wishListItemModel");
const Product = require("../models/productModel");
const wishListItem = require("../models/wishListItemModel");

const addToWishList = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    const exists = await wishListItem.findOne({
      userId: req.user.id,
      productId,
    });

    if (exists) {
      return res.status(400).json({
        message: "Product already exist in wishlist",
      });
    }
    const wishListItem = await wishListItem.create({
      userId: req.user.id,
      productId,
    });

    res.status(201).json({
      message: "Product added to wishlist",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
};

const getWishList = async (req, res) => {
  try {
    const wishListItems = await wishListItem
      .find({
        userId: req.user.id,
      })
      .populate("productId");

    res.status(200).json({
      message: "Wishlist fetched",
      wishList: wishListItems,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
};

const removeWishListItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    await wishListItem.findByIdAndDelete(itemId);

    res.status(200).json({
      message: "Item removed from the wishlist",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
};

module.exports = { addToWishList, getWishList, removeWishListItem };
