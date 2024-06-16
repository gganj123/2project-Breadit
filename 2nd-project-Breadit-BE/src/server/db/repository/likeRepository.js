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

// Like.findOne = async function (post_id, user_id) {
//   try {
//     // 조건에 맞는 Like 데이터를 데이터베이스에서 찾습니다.
//     const like = await Like.findOne({ post_id, user_id });
//     return like; // 찾은 Like 데이터를 반환합니다.
//   } catch (error) {
//     throw error; // 오류가 발생하면 오류를 던집니다.
//   }
// };

module.exports = Like;
