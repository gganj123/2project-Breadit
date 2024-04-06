const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// POST 요청: 댓글 생성
router.post('/', commentController.createComment);

// GET 요청: 모든 댓글 가져오기
router.get('/', commentController.getAllComments);

// GET 요청: 특정 댓글 가져오기
router.get('/:id', commentController.getCommentById);

// GET 요청: 특정 사용자의 댓글 가져오기
router.get('/user/:userId', commentController.getCommentsByUserId);

// PUT 요청: 댓글 업데이트
router.put('/:id', commentController.updateComment);

// DELETE 요청: 댓글 삭제
router.delete('/:id', commentController.deleteComment);

module.exports = router;