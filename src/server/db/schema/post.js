const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
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
    bread_id: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = postSchema;
