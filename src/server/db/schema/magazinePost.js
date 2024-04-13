const mongoose = require("mongoose");

const magazinePostSchema = new mongoose.Schema(
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
    },
    like_count: Number,
    belike: {
      type: Boolean,
      default: false, // 기본값은 false로 설정합니다.
    },
    thumbnail: String,
    images: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = magazinePostSchema;
// module.export = mongoose.model("MagazinePost", magazinePostSchema);
