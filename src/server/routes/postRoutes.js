const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// POST 요청: 포스트 생성
router.post("/", postController.createPost);

// GET 요청: 모든 포스트 가져오기
router.get("/", postController.getAllPosts);

// GET 요청: 특정 포스트 가져오기
router.get("/:id", postController.getPostById);

// GET 요청: 모든 포스트 가져오기 (부분 검색 포함)
router.get("/:searchQuery", postController.getAllPosts);

// PUT 요청: 포스트 업데이트
router.put("/:id", postController.updatePost);

// DELETE 요청: 포스트 삭제
router.delete("/:id", postController.deletePost);

// 게시물 좋아요 토글 라우터
router.post("/toggle", postController.toggleLikeController);

module.exports = router;
