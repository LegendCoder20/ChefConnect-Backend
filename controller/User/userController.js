const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const zod = require("zod");

const User = require("../../models/userModel");
const {
  registerSchema,
  loginSchema,
} = require("../../Validation Checks/userValidation");
const {Error} = require("mongoose");

// REGISTER USER //

const registerUser = asyncHandler(async (req, res) => {
  const {username, email, password} = req.body;

  const checkValidation = registerSchema.safeParse(req.body);

  if (!checkValidation.success) {
    res.status(400);
    throw new Error(
      `Validation Error: ${checkValidation.error.errors
        .map((e) => e.message)
        .join(", ")}`
    );
  }

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please Enter All Credentials");
  }

  const userExists = await User.findOne({email});
  if (userExists) {
    res.status(409);
    throw new Error("E-mail Already Exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(200).json({
      // _id: user.id,
      // email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

//LOGIN USER //

const loginUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body;

  const checkValidation = loginSchema.safeParse(req.body);
  if (!checkValidation.success) {
    res.status(400);
    throw new Error(
      `Validation Error : ${checkValidation.error.errors
        .map((e) => e.message)
        .join(", ")}`
    );
  }

  if (!email || !password) {
    res.status(400);
    throw new Error("Please Enter All Credentials");
  }

  const user = await User.findOne({email});

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      // username: user.username,
      // email,

      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

// GET USER //

const getUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});

// Generate Token

const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "30d"});
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
