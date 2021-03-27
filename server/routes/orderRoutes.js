const express = require('express');
const { addOrderItems, getOrderID } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create-order', protect, addOrderItems);
router.get('/:id', protect, getOrderID);
module.exports = router;
