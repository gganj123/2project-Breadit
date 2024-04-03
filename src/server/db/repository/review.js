const Review = require('../schema/review'); 

// 리뷰 생성
async function createReview(reviewData) {
  try {
    const newReview = await Review.create(reviewData);
    return newReview;
  } catch (error) {
    throw new Error('리뷰 생성 중 오류가 발생했습니다.');
  }
}

// 리뷰 조회
async function getReviewById(reviewId) {
  try {
    const review = await Review.findById(reviewId);
    return review;
  } catch (error) {
    throw new Error('리뷰 조회 중 오류가 발생했습니다.');
  }
}

// 리뷰 수정
async function updateReview(reviewId, updatedData) {
  try {
    const updatedReview = await Review.findByIdAndUpdate(reviewId, updatedData, { new: true });
    return updatedReview;
  } catch (error) {
    throw new Error('리뷰 수정 중 오류가 발생했습니다.');
  }
}

// 리뷰 삭제
async function deleteReview(reviewId) {
  try {
    const deletedReview = await Review.findByIdAndDelete(reviewId);
    return deletedReview;
  } catch (error) {
    throw new Error('리뷰 삭제 중 오류가 발생했습니다.');
  }
}


async function getReviewsForbread(postId) {
    try {
      const reviews = await Review.find({ post_id: postId });
      return reviews;
    } catch (error) {
      throw new Error('리뷰 조회 중 오류가 발생했습니다.');
    }
  }

  module.exports = {
        createReview,
        getReviewById,
        updateReview,
        deleteReview,
        getReviewsForbread,
  }