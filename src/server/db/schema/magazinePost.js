const mongoose = require("mongoose");

const magazinePostSchema = new mongoose.Schema(
  {
    post_id: mongoose.Schema.Types.ObjectId,
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
    },
    images: String,
  },
  {
    timestamps: true,
  }
);

module.exports = magazinePostSchema;
// module.export = mongoose.model("MagazinePost", magazinePostSchema);
