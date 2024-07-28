const express = require("express");
const router = express.Router();
// const {protect} = require("../../middleware/Guest/guestMiddleware");
const {getAllRecipes} = require("../../controller/Guest/guestController");
const {
  getRecipeDetails,
} = require("../../controller/User/userRecipeController");

router.get("/", getAllRecipes);

router.get("/recipe/:id", getRecipeDetails);

// Not Using the Below Code Because you think you can use also ( Either Use Above Code or Below Code  )
// router.get("/",protect getAllRecipes);

module.exports = router;
