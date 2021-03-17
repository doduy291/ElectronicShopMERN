const asyncHandler = require('express-async-handler');
const userModel = require('../models/User_Model');
const generateToken = require('../utils/generateToken');

// @route POST api/users/login
exports.authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email: email });
  // const checkMatchPassword = await bcrypt.compare(password, user.password); //
  // user.matchPassword can replace by "const checkMatchPassword = ...."
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @route POST api/users/register
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await userModel.findOne({ email: email });
  if (userExist) {
    res.status(401);
    throw new Error('Email Already Exists!');
  }
  const user = await userModel.create({ name: name, email: email, password: password });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid User Data');
  }
});

// @route GET api/users/register
exports.getUserProfile = asyncHandler(async (req, res) => {
  const user = await userModel.findOne({ _id: req.user._id });
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User Profile not Found');
  }
});

// @route PUT api/users/register
exports.updateUserProfile = asyncHandler(async (req, res) => {
  const user = await userModel.findOne({ _id: req.user._id });
  if (user) {
    const { name, email, password } = req.body;
    user.name = name || user.name;
    user.email = email || user.email;
    if (password) user.password = password;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User Profile not Found');
  }
});
