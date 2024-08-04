const asyncHandler = require("express-async-handler");
const Recipe = require("../../models/recipeModel");

const getAllRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find();
  res.status(200).json({
    recipes: recipes,
  });
});

module.exports = {
  getAllRecipes,
};
