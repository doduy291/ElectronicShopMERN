const asyncHandler = require('express-async-handler');
const productModel = require('../models/Product_Model');
const sharp = require('sharp');

exports.getProduct = asyncHandler(async (req, res) => {
  const pageSize = 4;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};
  const count = await productModel.count({ ...keyword });
  const allProducts = await productModel
    .find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ allProducts, page, pages: Math.ceil(count / pageSize) });
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
  const product = new productModel({
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
  if (req.file) {
    const filename = image.slice(1);
    await sharp(req.file.buffer).resize(640, 510).toFile(`${filename}`);
  }
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @route PUT api/products/update/:id
// @access Private/Admin
exports.updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } = req.body;
  const product = await productModel.findById(req.params.id);
  if (product) {
    const filename = image.slice(1);
    await sharp(req.file.buffer).resize(640, 510).toFile(`${filename}`);

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
    throw new Error('Product not found');
  }
});

// @route POST api/products/reviews/:id
exports.createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await productModel.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find((r) => r._iduser.toString() === req.user._id.toString());
    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      _iduser: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((cur, pre) => cur + pre.rating, 0) / product.reviews.length;
    await product.save();
    res.status(201).json({ message: 'Review added', product });
  } else {
    res.status(404);
    throw new ErrorEvent('Product not found');
  }
});

// @route GET api/products/top
exports.getTopProducts = asyncHandler(async (req, res) => {
  const topProducts = await productModel.find({}).sort({ rating: -1 }).limit(3);

  res.json(topProducts);
});
