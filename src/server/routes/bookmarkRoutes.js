const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmarkController');

// 북마크 생성
router.post('/', bookmarkController.createBookmark);

// 모든 북마크 조회
router.get('/', bookmarkController.getAllBookmarks);

// 특정 사용자의 북마크 조회
router.get('/users/:userId', bookmarkController.getUserBookmarks);

// 특정 포스트의 북마크 조회
router.get('/posts/:postId', bookmarkController.getPostBookmarks);

// 북마크 삭제
router.delete('/:id', bookmarkController.deleteBookmark);

module.exports = router;