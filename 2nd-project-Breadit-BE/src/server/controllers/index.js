const userService = require('./userService');
const postService = require('./postService');
const commentService = require('./commentService');
const magazinePostService = require('./magazinePostService');
const recipeService = require('./recipeService');
const reviewService = require('./reviewService');
const breadService = require('./breadService');
const likeController = require('./likeController');
const bookmarkController = require('./bookmarkController');

module.exports = {
  userService,
  postService,
  commentService,
  magazinePostService,
  recipeService,
  reviewService,
  breadService,
  likeController,
  bookmarkController
};