const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    nickname: {
      type: String,
      required: true,
    },
    profile: String,
    user_id: {
      type: String,
      required: true,
    },
    post_id: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    can_post: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commentSchema);
