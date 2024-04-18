const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    post_id: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = bookmarkSchema;

// module.exports = mongoose.model("Bookmark", bookmarkSchema);
