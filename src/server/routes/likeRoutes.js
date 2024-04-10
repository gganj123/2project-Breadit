const express = require("express");
const likeController = require("../controllers/likeController");
const postController = require("../controllers/postController");

const router = express.Router();

// 좋아요 생성 라우터
router.post("/", likeController.createLike);

// 모든 좋아요 조회 라우터
router.get("/", likeController.getAllLikes);

// 게시물 좋아요 토글 라우터
router.post("/toggle", postController.toggleLikeController);

// // 특정 사용자의 좋아요 조회 라우터
// router.get("/users/:userId", likeController.getUserLikes);

// // 특정 게시물의 좋아요 조회 라우터
// router.get("/posts/:postId", likeController.getPostLikes);

// 좋아요 삭제
router.delete("/:id", likeController.deleteLike);

module.exports = router;
