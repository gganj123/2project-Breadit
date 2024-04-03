const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// 댓글 조회
router.get('/comments/:posted_id', commentController.getCommentsByPostId);

// 댓글 생성
router.post('/comments', commentController.createComment);

// 댓글 수정
router.put('/comments/:comment_id', commentController.updateComment);

// 라우터 모듈 내보내기
module.exports = router;