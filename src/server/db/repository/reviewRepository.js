const Review = require("../schema/review");

async function createReview(reviewData) {
  try {
    const newReview = await Review.create(reviewData);
    return newReview;
  } catch (error) {
    throw new Error("Error creating review");
  }
}

async function getAllReviews(filter) {
  try {
    const reviews = await Review.find(filter);
    return reviews;
  } catch (error) {
    throw new Error("Error fetching reviews from database");
  }
}

async function getReviewById(reviewId) {
  try {
    const review = await Review.findById(reviewId);
    return review;
  } catch (error) {
    throw new Error("Error fetching review");
  }
}

async function updateReview(reviewId, newData) {
  try {
    const updatedReview = await Review.findByIdAndUpdate(reviewId, newData, {
      new: true,
    });
    return updatedReview;
  } catch (error) {
    throw new Error("Error updating review");
  }
}

async function deleteReview(reviewId) {
  try {
    const deletedReview = await Review.findByIdAndDelete(reviewId);
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
