const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

// @desc    Register a regular user
// @route   POST /api/users/register
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    isSupplier: false
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isSupplier: user.isSupplier,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Register a supplier
// @route   POST /api/users/register-supplier
const registerSupplier = asyncHandler(async (req, res) => {
  const { companyName, contactPerson, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    companyName,
    contactPerson,
    email,
    password,
    isSupplier: true
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      isSupplier: user.isSupplier,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error('Invalid supplier data');
  }
});

// @desc    Auth user & get token
// @route   POST /api/users/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isSupplier: user.isSupplier,
      companyName: user.companyName,
      contactPerson: user.contactPerson,
      token: generateToken(user._id)
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isSupplier: user.isSupplier,
      companyName: user.companyName,
      contactPerson: user.contactPerson
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

module.exports = {
  registerUser,
  registerSupplier,
  loginUser,
  getUserProfile
};