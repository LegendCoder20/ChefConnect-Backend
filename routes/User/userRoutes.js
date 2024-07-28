const express = require("express");
const router = express.Router();
const {protect} = require("../../middleware/User/userMiddleware");

const {
  registerUser,
  loginUser,
  getUser,
} = require("../../controller/User/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getUser);

module.exports = router;
