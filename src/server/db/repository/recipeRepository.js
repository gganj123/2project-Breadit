const mongoose = require("mongoose");
const recipeSchema = require("../schema/post");

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
