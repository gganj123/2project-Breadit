const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    profile: String,
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    }, // 작성된 내용
    images: [String],
    like_count: Number,
    belike: {
      type: Boolean,
      default: false, // 기본값은 false로 설정합니다.
    },
    thumbnail: String,
  },
  {
    timestamps: true,
  }
);

// function arrayLimit(val) {
//   return val.length <= 5;
// }

module.exports = recipeSchema;
