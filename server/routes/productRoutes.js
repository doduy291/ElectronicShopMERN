const express = require('express');
const asyncHandler = require('express-async-handler');
const productModel = require('../models/Product_Model');
const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const allProducts = await productModel.find({});
    res.json(allProducts);
  })
);
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const oneProduct = await productModel.findOne({ _id: req.params.id });
    if (oneProduct) {
      res.json(oneProduct);
    } else {
      res.status(404);
      throw new Error('Product Not Found');
    }
  })
);

module.exports = router;
