const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    title: { 
      type: String,
      required: true
    },
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
    }
  },
  {
    timestamps: true,
  }
);

function arrayLimit(val) {
  return val.length <= 5;
}

module.exports = postSchema;
