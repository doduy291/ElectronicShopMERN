const express = require('express');
const { addOrderItems, getOrderID, updateOrderToPaid, getMyOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/create-order').post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderID);
router.route('/:id/pay').put(protect, updateOrderToPaid);

module.exports = router;
