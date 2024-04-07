const breadSchema = require("./bread");
const commentSchema = require("./comment");
const magazinePostSchema = require("./magazinePost");
const postSchema = require("./post");
const recipeSchema = require("./recipe");
const reviewSchema = require("./review");
const bookmarkSchema = require('./bookmark')
const likeSchema = require('./like');

const user = require("./user");


module.exports = {
  breadSchema,
  commentSchema,
  magazinePostSchema,
  postSchema,
  recipeSchema,
  reviewSchema,
  likeSchema,
  bookmarkSchema,
  user,
};
