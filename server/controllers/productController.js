const asyncHandler = require('express-async-handler');
const productModel = require('../models/Product_Model');

exports.getProduct = asyncHandler(async (req, res) => {
  const allProducts = await productModel.find({});
  res.json(allProducts);
});
exports.getProductByID = asyncHandler(async (req, res) => {
  const oneProduct = await productModel.findOne({ _id: req.params.id });
  if (oneProduct) {
    res.json(oneProduct);
  } else {
    res.status(404);
    throw new Error('Product Not Found');
  }
});

// @route DELETE api/products/delete/:id
// @access Private/Admin
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await productModel.findOne({ _id: req.params.id });
  if (user) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});
