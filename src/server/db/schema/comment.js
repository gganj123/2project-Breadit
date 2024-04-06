const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  comment_id : mongoose.Schema.Types.ObjectId,
  nickname : String,
  post_id: String,//댓글 postid도 이럻게 가져오면 post의 데이터와 안겹치는지!
  content: String,
  can_post: { 
    type: Boolean,
    default: true 
  }},
  {
    timestamps: true
  }
);



module.exports = commentSchema;