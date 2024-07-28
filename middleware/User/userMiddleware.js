const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password"); // .select("-password")  // To Exclude Password
      next();
    } catch (err) {
      console.log(err);
      res.status(400);
      throw new Error(
        "Some Problem Occured while Verifying Token ",
        err.message
      );
    }
  } else {
    res.status(401);
    throw new Error("Token Not Authorized ");
  }

  if (!token) {
    res.status(401);
    throw new Error("No Token, Not Authorized");
  }
});

module.exports = {protect};
