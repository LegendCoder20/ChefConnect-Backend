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
  likeRecipe,
  checkIfRecipeLiked,
  dislikeRecipe,
  checkIfRecipeDisliked,
} = require("../../controller/User/userRecipeController");

router.get("/", protect, getAllRecipe);
router.post("/addrecipe", protect, upload, createRecipe);
router.route("/:id").delete(protect, deleteRecipe).get(protect, getAllRecipe);
router.put("/like/:id", protect, likeRecipe);
router.get("/like/:id", protect, checkIfRecipeLiked);
router.put("/dislike/:id", protect, dislikeRecipe);
router.get("/dislike/:id", protect, checkIfRecipeDisliked);

module.exports = router;
