const asyncHandler = require('express-async-handler');
const Product = require('../models/Product_Model');
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
  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @route POST api/products/create
// @access Private/Admin
exports.createProduct = asyncHandler(async (req, res) => {
  const { name, price, image, brand, category, countInStock, description } = req.body;
  const product = new Product({
    name: name,
    price: price,
    _iduser: req.user._id,
    image: image,
    brand: brand,
    category: category,
    countInStock: countInStock,
    numReviews: 0,
    description: description,
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @route PUT api/products/update/:id
// @access Private/Admin
exports.updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } = req.body;
  const product = await productModel.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countIntSotck = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new ErrorEvent('Product not found');
  }
});
