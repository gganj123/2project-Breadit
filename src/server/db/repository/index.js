const Post = require("./postRepository");
const Comment = require("./commentRepository");
const Magazine = require("./magazinePostRepository");
const Recipe = require("./recipeRepository");
const Review = require("./reviewRepository");
const Bread = require("./breadRepository");
const Like = require("./likeRepository");
const Bookmark = require("./bookmarkRepository");

module.exports = {
  Post,
  Comment,
  Magazine,
  Recipe,
  Review,
  Bread,
  Like,
  Bookmark,
};
