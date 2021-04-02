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
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order Detail Not Found');
  }
});

// @route PUT /api/orders/:id/pay
exports.updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await orderModel.findOne({ _id: req.params.id });
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Cannot Update Order To Paid');
  }
});

// @route GET /api/orders/myorders
exports.getMyOrders = asyncHandler(async (req, res) => {
  const orders = await orderModel.find({ _iduser: req.user._id });
  res.json(orders);
});

// @route GET /api/orders/
// @access Private/Admin
exports.getOrders = asyncHandler(async (req, res) => {
  const orders = await orderModel.find({}).populate('_iduser', 'id name email');
  res.json(orders);
});
