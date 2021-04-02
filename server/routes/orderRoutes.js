const express = require('express');
const {
  addOrderItems,
  getOrderID,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, admin, getOrders);
router.route('/create-order').post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderID);
router.route('/:id/pay').put(protect, updateOrderToPaid);

module.exports = router;
