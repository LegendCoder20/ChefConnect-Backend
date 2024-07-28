const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema(
  {
    dishName: {
      type: String,
      required: [true, "Enter the Dish Name"],
    },

    category: {
      type: String,
      required: [true, "Enter the Dish Type"],
    },
    recipe: {
      type: String,
      required: [true, "Enter the Recipe"],
    },
    image: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    like: {
      type: Number,
      default: 0,
      required: true,
    },
    dislike: {
      type: Number,
      default: 0,
      required: true,
    },
    // REVIEWS
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Stores the reference to the user who wrote the review
          required: true,
        },
        username: {
          type: String,
          required: true,
        },

        comment: {
          type: String,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {timestamps: true}
);

module.exports = mongoose.model("Recipe", recipeSchema);
