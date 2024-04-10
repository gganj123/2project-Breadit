const Like = require("../db/repository/likeRepository");

// 좋아요 생성 함수
async function createLike(likeData) {
  try {
    const newLike = await Like.create(likeData);
    return newLike;
  } catch (error) {
    throw new Error("좋아요를 생성하는 중 오류가 발생했습니다.");
  }
}

async function getAllLikes(post_id, user_id) {
  try {
    let filter = {};
    if (post_id) {
      filter.post_id = post_id;
    }
    if (user_id) {
      filter.user_id = user_id;
    }
    const likes = await Like.find(filter);
    return likes;
  } catch (error) {
    throw new Error("모든 좋아요를 조회하는 중 오류가 발생했습니다.");
  }
}

async function deleteLike(likeId) {
  try {
    const deletedLike = await Like.findByIdAndDelete(likeId);
    if (!deletedLike) {
      throw new Error("해당 ID에 해당하는 좋아요를 찾을 수 없습니다.");
    }
    return deletedLike;
  } catch (error) {
    throw new Error("좋아요 삭제 중 오류가 발생했습니다.");
  }
}

module.exports = {
  createLike,
  getAllLikes,
  deleteLike,
};
