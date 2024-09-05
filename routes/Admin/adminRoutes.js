const express = require("express");
const router = express.Router();

const deleteRecipe = require("../../controller/Admin/adminController");
const {getAllRecipes} = require("../../controller/Guest/guestController");

router.route("/:id").delete(deleteRecipe).get(getAllRecipes);

module.exports = router;
