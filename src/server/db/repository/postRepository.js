const mongoose = require('mongoose');
const postSchema = require('../schema/post');

const Post = mongoose.model('Post', postSchema);

module.exports = Post;