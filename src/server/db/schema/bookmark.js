const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema(
  {
    bookmark_id: mongoose.Schema.Types.ObjectId,
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

module.exports = bookmarkSchema;
