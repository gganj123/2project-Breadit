const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true }, 
    title: String,
    content: { 
      type: String, 
      required: true 
    }, // 작성된 내용
    images: { 
      type: [String], 
      validate: [arrayLimit, '{PATH} exceeds the limit of 5'] 
    }, // 첨부된 이미지 (최대 5개)

  },
  {
    timestamps: true,
    versionKey: false,
  }
);

function arrayLimit(val) {
  return val.length <= 5;
}

module.exports = recipeSchema;
