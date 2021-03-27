const asyncHandler = require('express-async-handler');
const orderModel = require('../models/Order_Model');

// @route POST /api/orders/create-order
exports.addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, taxPrice, shippingPrice, totalPrice } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new orderModel({
      orderItems,
      _iduser: req.user._id,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @route GET /api/orders/:id
exports.getOrderID = asyncHandler(async (req, res) => {
  const order = await orderModel.findOne({ _id: req.params.id }).populate('_iduser', 'name email');
  console.log(order);
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order Detail Not Found');
  }
});
