const mongoose = require("mongoose");
const likeSchema = require("../schema/like");

// 모델 생성
const Like = mongoose.model("Like", likeSchema);

Like.findOneAndRemove = async function (filter) {
  try {
    const removedLike = await this.findOneAndDelete(filter);
    return removedLike;
  } catch (error) {
    throw error;
  }
};

module.exports = Like;
