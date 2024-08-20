const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema(
  {
    dishName: {
      type: String,
      required: [true, "Enter the Dish Name"],
    },
    description: {
      type: String,
      required: [true, "Enter the Description"],
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
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    likesCount: {
      type: Number,
      default: 0,
    },
    dislikesCount: {
      type: Number,
      default: 0,
    },

    // REVIEWS
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Stores the reference to the user who wrote the review
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
