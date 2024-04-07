const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  comment_id : mongoose.Schema.Types.ObjectId,
  nickname : {
    type: String,
    required: true
  },
  profile: String,
  user_id: {
    type: String,
    required: true
  },

  post_id: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  can_post: { 
    type: Boolean,
    default: true 
  }},
  {
    timestamps: true
  }
);



module.exports = commentSchema;