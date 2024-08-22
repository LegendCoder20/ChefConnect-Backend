const zod = require("zod");

const recipeSchema = zod.object({
  dishName: zod.string().max(20, "Dish name can be up to 20 characters long"),
  description: zod.string(),
  category: zod.string(),
  recipe: zod.string(),
  //   image: zod.string(),  // Dont Use
});

module.exports = recipeSchema;
