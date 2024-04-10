const Like = require("../db/repository/likeRepository");

// 좋아요 생성 함수
async function createLike(likeData) {
  const newLike = await Like.create(likeData);
  if (!newLike) {
    const error = new Error("좋아요를 생성하는 중 오류가 발생했습니다.");
    error.status = 500;
    throw error;
  }
  return newLike;
}

// 좋아요 전체 조회 함수
async function getAllLikes(post_id, user_id) {
  let filter = {};
  if (post_id) {
    filter.post_id = post_id;
  }
  if (user_id) {
    filter.user_id = user_id;
  }
  const likes = await Like.find(filter);
  if (!likes) {
    const error = new Error("모든 좋아요를 조회하는 중 오류가 발생했습니다.");
    error.status = 404;
    throw error;
  }
  return likes;
}

// 좋아요 삭제 함수
async function deleteLike(likeId) {
  const deletedLike = await Like.findByIdAndDelete(likeId);
  if (!deletedLike) {
    const error = new Error(
      "해당 likeId에 해당하는 좋아요를 찾을 수 없습니다."
    );
    error.status = 404;
    throw error;
  }
  return deletedLike;
}

module.exports = {
  createLike,
  getAllLikes,
  deleteLike,
};
