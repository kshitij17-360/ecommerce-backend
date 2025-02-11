const Product = require("../models/productModel");
const getProducts = async (req, res) => {
  try {
    const { search, minPrice, maxPrice, page, limit } = req.query;
    const query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }
      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
    }
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    const products = await Product.find(query).skip(skip).limit(limitNumber);
    res.status(200).json({
      message: "Products fetched",
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
};
/*const products = await Product.find();

    res.status(200).json({
      message: "product fetched",
      products: products,
    });
  } catch (error) {
    res.status(500),
      json({
        message: error.message || "internal server error",
      });
  }
};
*/
const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = await Product.create(productData);

    res.status(201).json({
      message: "product created",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "internal server error",
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!Product) {
      return res.status(404).json({
        message: "product not found",
      });
    }
    res.status(200).json({
      message: "product fetched",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const productData = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "product not found",
      });
    }

    const updateProduct = await Product.findByIdAndUpdate(
      productId,
      {
        ...productData,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "product fetched",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!Product) {
      return res.status(404).json({
        message: "product not found",
      });
    }

    await Product.findByIdAndDelete(productId);

    res.status(200).json({
      message: "product deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
