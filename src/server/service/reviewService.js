const ReviewRepository = require("../db/repository/reviewRepository");

async function createReview(reviewData) {
  try {
    const newReview = await ReviewRepository.createReview(reviewData);
    return newReview;
  } catch (error) {
    throw new Error("Error creating review");
  }
}

async function getAllReviews(post_id, user_id) {
  try {
    let filter = {};
    if (post_id) {
      filter.post_id = post_id;
    }
    if (user_id) {
      filter.user_id = user_id;
    }
    const reviews = await ReviewRepository.getAllReviews(filter);
    return reviews;
  } catch (error) {
    throw new Error("Error fetching reviews");
  }
}

async function getReviewById(reviewId) {
  try {
    const review = await ReviewRepository.getReviewById(reviewId);
    return review;
  } catch (error) {
    throw new Error("Error fetching review");
  }
}

async function updateReview(reviewId, newData) {
  try {
    const updatedReview = await ReviewRepository.updateReview(
      reviewId,
      newData
    );
    return updatedReview;
  } catch (error) {
    throw new Error("Error updating review");
  }
}

async function deleteReview(reviewId) {
  try {
    const deletedReview = await ReviewRepository.deleteReview(reviewId);
    return deletedReview;
  } catch (error) {
    throw new Error("Error deleting review");
  }
}

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
};
