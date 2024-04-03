module.exports = Post;
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true }, 
    content: { 
      type: String, 
      required: true 
    }, // 작성된 내용
    images: { 
      type: [String], 
      validate: [arrayLimit, '{PATH} exceeds the limit of 5'] 
    }, // 첨부된 이미지 (최대 5개)
    bread_id: { 
      type: String 
    }, 
    comment_id:[{
      type:String
    }] 
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

function arrayLimit(val) {
  return val.length <= 5;
}

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
