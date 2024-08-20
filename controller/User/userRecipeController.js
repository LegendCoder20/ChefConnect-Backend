const asyncHandler = require("express-async-handler");
const Recipe = require("../../models/recipeModel");
const dataUri = require("../../utils/dataUri");

/////////////////////////  GET ALL RECIPES  ////////////////////////////////////
const getAllRecipe = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find({user: req.user.id});
  //   console.log(recipes);
  res.status(200).json({
    recipes: recipes,
    msg: "Got Users All Recipes",
  });
});

/////////////////////////  GET RECIPE DETAILS  ////////////////////////////////////
const getRecipeDetails = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  // console.log(recipe);
  res.status(200).json({
    recipe: recipe,
    msg: ` Got ${req.params.id} Id Detailed Recipe `,
  });
});

// CLOUDINARY //
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

/////////////////////////  CREATING RECIPES  ////////////////////////////////////
const createRecipe = asyncHandler(async (req, res) => {
  const {dishName, description, category, recipe} = req.body;
  const image = req.file;

  if (!dishName || !description || !category || !recipe || !image) {
    res.status(400);
    throw new Error("Please Enter All Credentials");
  }

  const fileUri = dataUri(image);
  // console.log(
  //   "I'm from userRecipeController.js --> CreateRecipe --> fileUri ",
  //   fileUri
  // );

  const myCloud = await cloudinary.uploader.upload(fileUri.content);

  if (!req.user) {
    throw new Error("User Not Authorized");
  }

  const createdRecipe = await Recipe.create({
    dishName,
    description,
    category,
    recipe,
    image: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
    user: req.user.id,
  });

  if (createdRecipe) {
    res.status(201).json({
      recipe: createdRecipe,
      msg: "Recipe Created",
    });
  } else {
    res.status(400);
    throw new Error("Invalid Recipe Data");
  }
});

/////////////////////////  DELETING RECIPES  ////////////////////////////////////
const deleteRecipe = asyncHandler(async (req, res) => {
  const recipeId = req.params.id;
  const recipe = await Recipe.findById(recipeId);

  if (!recipe) {
    res.status(400);
    throw new Error("Recipe Not Found ");
  }
  if (!req.user) {
    res.status(400);
    throw new Error("User Not Found ");
  }
  if (recipe.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Unauthorized to Delete this Product");
  }

  await cloudinary.uploader.destroy(recipe.image.public_id);
  await Recipe.findByIdAndDelete(recipeId);
  res.status(200).json({
    msg: "Recipe Deleted Successfully",
  });
});

// const updateRecipe = asyncHandler(async (req, res) => {});

// ////////////////////////////////////////////////////////////// //

// LIKES and DISLIKES Logic

const likeRecipe = asyncHandler(async (req, res) => {
  const recipeId = req.params.id;
  const userId = req.user.id;

  const recipe = await Recipe.findById(recipeId);

  if (!recipe) {
    return res.status(404).json({message: "Recipe not found"});
  }

  if (recipe.likes.includes(userId)) {
    return res
      .status(400)
      .json({message: "You have already liked this recipe"});
  }

  if (recipe.dislikes.includes(userId)) {
    recipe.dislikes.pull(userId);
    recipe.dislikesCount = Math.max(recipe.dislikesCount - 1, 0);
  }

  recipe.likes.push(userId);
  recipe.likesCount = recipe.likes.length;

  await recipe.save();

  res.status(200).json({
    recipe,
    msg: "Recipe Liked",
  });
});

const dislikeRecipe = asyncHandler(async (req, res) => {
  const recipeId = req.params.id;
  const userId = req.user.id;

  const recipe = await Recipe.findById(recipeId);

  if (!recipe) {
    res.status(404);
    throw new Error("Recipe Not Found");
  }
  if (recipe.dislikes.includes(userId)) {
    res.status(400);
    throw new Error("You Already Disliked this Recipe");
  }

  if (recipe.likes.includes(userId)) {
    recipe.likes.pull(userId);
    recipe.likesCount -= 1;
  }

  recipe.dislikes.push(userId);
  recipe.dislikesCount += 1;

  await recipe.save();

  res.status(200).json({
    recipe,
    msg: "Recipe Disliked",
  });
});

module.exports = {
  getAllRecipe,
  getRecipeDetails,
  createRecipe,
  deleteRecipe,
  likeRecipe,
  dislikeRecipe,
};
