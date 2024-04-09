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
    images: String,
  },
  {
    timestamps: true,
  }
);

// function arrayLimit(val) {
//   return val.length <= 5;
// }

module.exports = recipeSchema;
