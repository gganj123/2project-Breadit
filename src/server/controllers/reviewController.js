const reviewService = require('../service/reviewService');

// 리뷰 생성 컨트롤러
async function createReview(req, res) {
    try {
        const reviewData = req.body;
        const newReview = await reviewService.createReview(reviewData);
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// 모든 리뷰 가져오기 컨트롤러
async function getAllReviews(req, res) {
    try {
        const reviews = await reviewService.getAllReviews();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// 특정 리뷰 가져오기 컨트롤러
async function getReviewById(req, res) {
    try {
        const reviewId = req.params.id;
        const review = await reviewService.getReviewById(reviewId);
        if (!review) {
            res.status(404).json({ message: '리뷰를 찾을 수 없습니다.' });
            return;
        }
        res.json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// 특정 사용자의 리뷰 가져오기 컨트롤러
async function getReviewsByUserId(req, res) {
    try {
        const userId = req.params.userId;
        const reviews = await reviewService.getReviewsByUserId(userId);
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// 리뷰 업데이트 컨트롤러
async function updateReview(req, res) {
    try {
        const reviewId = req.params.id;
        const newData = req.body;
        const updatedReview = await reviewService.updateReview(reviewId, newData);
        res.json(updatedReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// 리뷰 삭제 컨트롤러
async function deleteReview(req, res) {
    try {
        const reviewId = req.params.id;
        const deletedReview = await reviewService.deleteReview(reviewId);
        res.json(deletedReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createReview,
    getAllReviews,
    getReviewById,
    getReviewsByUserId,
    updateReview,
    deleteReview
};