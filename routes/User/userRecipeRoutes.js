const express = require("express");
const router = express.Router();
const {protect} = require("../../middleware/User/userMiddleware");
const upload = require("../../middleware/User/imageUploadMiddleware");

const {
  getAllRecipe,
  createRecipe,
  // updateRecipe,
  deleteRecipe,
  getRecipeDetails,
} = require("../../controller/User/userRecipeController");

router.get("/", protect, getAllRecipe);
router.post("/addrecipe", protect, upload, createRecipe);
router
  .route("/:id")
  .delete(protect, deleteRecipe)
  .get(protect, getRecipeDetails);

module.exports = router;
