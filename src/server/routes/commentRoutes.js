const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

// 댓글 생성 API 엔드포인트
router.post("/", commentController.createComment);

// 모든 댓글 가져오기 API 엔드포인트
router.get("/", commentController.getAllComments);

// 특정 댓글 가져오기 API 엔드포인트
router.get("/:id", commentController.getCommentById);

// 특정 사용자의 댓글 가져오기 API 엔드포인트
router.get("/user/:userId", commentController.getCommentsByUserId);

// 특정 포스트의 댓글 가져오기 API 엔드포인트
router.get("/posts/:postId", commentController.getCommentsByPostId);

// 댓글 업데이트 API 엔드포인트
router.put("/:id", commentController.updateComment);

// 댓글 삭제 API 엔드포인트
router.delete("/:id", commentController.deleteComment);

module.exports = router;
