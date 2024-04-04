const Review = require('../db/repository/review'); // Review 모델을 가져옵니다.

// 리뷰 생성 서비스
async function createReview(reviewData) {
  try {
    const newReview = await Review.create(reviewData);
    return newReview;
  } catch (error) {
    throw new Error('리뷰 생성 중 오류가 발생했습니다.');
  }
}

// 모든 리뷰 가져오기 서비스
async function getAllReviews() {
  try {
    const reviews = await Review.find();
    return reviews;
  } catch (error) {
    throw new Error('리뷰 조회 중 오류가 발생했습니다.');
  }
}

// 특정 리뷰 가져오기 서비스
async function getReviewById(reviewId) {
  try {
    const review = await Review.findById(reviewId);
    return review;
  } catch (error) {
    throw new Error('리뷰 조회 중 오류가 발생했습니다.');
  }
}

// 특정 사용자의 리뷰 가져오기 서비스
async function getReviewsByUserId(userId) {
  try {
    const reviews = await Review.find({ user_id: userId });
    return reviews;
  } catch (error) {
    throw new Error('사용자 리뷰 조회 중 오류가 발생했습니다.');
  }
}

// 리뷰 업데이트 서비스
async function updateReview(reviewId, newData) {
  try {
    const updatedReview = await Review.findByIdAndUpdate(reviewId, newData, { new: true });
    return updatedReview;
  } catch (error) {
    throw new Error('리뷰 업데이트 중 오류가 발생했습니다.');
  }
}

// 리뷰 삭제 서비스
async function deleteReview(reviewId) {
  try {
    const deletedReview = await Review.findByIdAndDelete(reviewId);
    return deletedReview;
  } catch (error) {
    throw new Error('리뷰 삭제 중 오류가 발생했습니다.');
  }
}

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  getReviewsByUserId,
  updateReview,
  deleteReview,
};