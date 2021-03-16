const express = require('express');
const { getProduct, getProductByID } = require('../controllers/productController');
const router = express.Router();

router.get('/', getProduct);
router.get('/:id', getProductByID);

module.exports = router;
