const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// POST 요청: 리뷰 생성
router.post('/', reviewController.createReview);

// GET 요청: 모든 리뷰 가져오기
router.get('/', reviewController.getAllReviews);

// GET 요청: 특정 리뷰 가져오기
router.get('/:id', reviewController.getReviewById);

// GET 요청: 특정 사용자의 리뷰 가져오기
router.get('/user/:userId', reviewController.getReviewsByUserId);

// PUT 요청: 리뷰 업데이트
router.put('/:id', reviewController.updateReview);

// DELETE 요청: 리뷰 삭제
router.delete('/:id', reviewController.deleteReview);

module.exports = router;