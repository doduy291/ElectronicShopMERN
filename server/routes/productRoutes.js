const express = require('express');
const productModel = require('../models/Product_Model');
const router = express.Router();

router.get('/', async (req, res) => {
  const allProducts = await productModel.find({});
  res.json(allProducts);
});
router.get('/:id', async (req, res) => {
  const oneProduct = await productModel.findOne({ _id: req.params.id });
  if (oneProduct) {
    res.json(oneProduct);
  } else {
    res.status(404).json({ message: 'Product Not Found' });
  }
});

module.exports = router;
