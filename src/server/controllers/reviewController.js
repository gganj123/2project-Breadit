const reviewService = require("../service/reviewService");
const reviewValidator = require("../validation/reviewValidation");

// 리뷰 생성 컨트롤러
async function createReview(req, res, next) {
  try {
    const validationResult = reviewValidator.validateReviewCreateReq(req.body);
    if (validationResult.error) {
      throw validationResult.error;
    }

    const newReview = await reviewService.createReview(validationResult.value);
    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
}

// 모든 리뷰 가져오기 컨트롤러
async function getAllReviews(req, res, next) {
  try {
    const reviews = await reviewService.getAllReviews();
    res.json(reviews);
  } catch (error) {
    next(error);
  }
}

// 특정 리뷰 가져오기 컨트롤러
async function getReviewById(req, res, next) {
  try {
    const reviewId = req.params.id;
    const review = await reviewService.getReviewById(reviewId);
    if (!review) {
      res.status(404).json({ message: "리뷰를 찾을 수 없습니다." });
      return;
    }
    res.json(review);
  } catch (error) {
    next(error);
  }
}

// 특정 사용자의 리뷰 가져오기 컨트롤러
async function getReviewsByUserId(req, res, next) {
  try {
    const userId = req.params.userId;
    const reviews = await reviewService.getReviewsByUserId(userId);
    res.json(reviews);
  } catch (error) {
    next(error);
  }
}

// 리뷰 업데이트 컨트롤러
async function updateReview(req, res, next) {
  try {
    const validationResult = reviewValidator.validateReviewUpdateReq(req.body);
    if (validationResult.error) {
      throw validationResult.error;
    }

    const reviewId = req.params.id;
    const updatedReview = await reviewService.updateReview(
      reviewId,
      validationResult.value
    );
    res.json(updatedReview);
  } catch (error) {
    next(error);
  }
}

// 리뷰 삭제 컨트롤러
async function deleteReview(req, res, next) {
  try {
    const reviewId = req.params.id;
    const deletedReview = await reviewService.deleteReview(reviewId);
    res.json(deletedReview);
  } catch (error) {
    next(error);
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
