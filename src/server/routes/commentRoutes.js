const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

// POST 요청: 코멘트 생성
router.post("/", commentController.createComment);

// GET 요청: 모든 코멘트 가져오기
router.get("/", commentController.getAllComments);

// GET 요청: 특정 코멘트 가져오기
router.get("/:id", commentController.getCommentById);

// PUT 요청: 코멘트 업데이트
router.put("/:id", commentController.updateComment);

// DELETE 요청: 코멘트 삭제
router.delete("/:id", commentController.deleteComment);

module.exports = router;
