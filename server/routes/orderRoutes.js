const express = require('express');
const {
  addOrderItems,
  getOrderID,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, admin, getOrders);
router.route('/create-order').post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderID);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

module.exports = router;
