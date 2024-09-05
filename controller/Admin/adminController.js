const Recipe = require("../../models/recipeModel");
const asyncHandler = require("express-async-handler");

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const deleteRecipe = asyncHandler(async (req, res) => {
  const recipeId = req.params.id;
  const recipe = await Recipe.findById(recipeId);

  if (!recipe) {
    res.status(400);
    throw new Error("No Such Recipe Exists Admin!!");
  }

  if (recipe.image && recipe.image.public_id) {
    await cloudinary.uploader.destroy(recipe.image.public_id);
  }

  await Recipe.findByIdAndDelete(recipeId);

  const recipes = await Recipe.find();
  res.status(200).json({
    recipes: recipes,
    msg: "Recipe Deleted Successfully",
  });
});

module.exports = deleteRecipe;
