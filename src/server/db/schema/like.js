const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    like_id: mongoose.Schema.Types.ObjectId,
    user_id: {
      type: String,
      required: true,
    },
    post_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = likeSchema;
