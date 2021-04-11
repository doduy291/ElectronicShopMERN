const express = require('express');

const {
  getProduct,
  getProductByID,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} = require('../controllers/productController');
const { admin, protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getProduct);
router.get('/top', getTopProducts);
router.post('/create', protect, admin, createProduct);
router.get('/:id', getProductByID);
router.put('/update/:id', protect, admin, updateProduct);
router.delete('/delete/:id', protect, admin, deleteProduct);
router.post('/reviews/:id', protect, createProductReview);

module.exports = router;
