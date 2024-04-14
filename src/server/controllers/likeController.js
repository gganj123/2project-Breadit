const likeService = require("../service/likeService");

// 좋아요 생성 컨트롤러
async function createLike(req, res) {
  try {
    const likeData = req.body;
    const newLike = await likeService.createLike(likeData);
    res.status(201).json(newLike);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// 모든 좋아요 조회 컨트롤러
// async function getAllLikes(req, res) {
//   try {
//     const likes = await likeService.getAllLikes();
//     res.json(likes);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }

// 모든 좋아요 조회 컨트롤러
async function getAllLikes(req, res, next) {
  try {
    const { post_id, user_id } = req.query;
    const likes = await likeService.getAllLikes(post_id, user_id);
    res.status(200).json(likes);
  } catch (error) {
    next(error);
  }
}

// // 특정 사용자의 좋아요 조회 컨트롤러
// async function getUserLikes(req, res) {
//   const { userId } = req.params;
//   try {
//     const userLikes = await likeService.getUserLikes(userId);
//     res.json(userLikes);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }

// // 특정 게시물의 좋아요 조회 컨트롤러
// async function getPostLikes(req, res) {
//   const { postId } = req.params;
//   try {
//     const postLikes = await likeService.getPostLikes(postId);
//     res.json(postLikes);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }

// 좋아요 삭제 컨트롤러
async function deleteLike(req, res) {
  try {
    const likeId = req.params.id;
    const deletedLike = await likeService.deleteLike(likeId);
    res.json(deletedLike);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createLike,
  getAllLikes,
  //   getUserLikes,
  //   getPostLikes,
  deleteLike,
};
