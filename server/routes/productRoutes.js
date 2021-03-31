const express = require('express');
const { getProduct, getProductByID, deleteProduct } = require('../controllers/productController');
const { admin, protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getProduct);
router.get('/:id', getProductByID);
router.delete('/delete/:id', protect, admin, deleteProduct);

module.exports = router;
