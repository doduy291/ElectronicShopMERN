const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const userModel = require('../models/User_Model');

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    try {
      token = req.headers.authorization.split(' ')[1] || req.headers.authorization;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await userModel.findOne({ _id: decoded.id }).select('-password');
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized, token fail!');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('No token');
  }
});
