const express = require("express");
const likeController = require("../controllers/likeController");
const postController = require("../controllers/postController");
const magazineController = require("../controllers/magazinePostController");
const recipeController = require("../controllers/recipeController");

const router = express.Router();

// 좋아요 생성 라우터
router.post("/", likeController.createLike);

// 모든 좋아요 조회 라우터
router.get("/", likeController.getAllLikes);

// 게시물 좋아요 토글 라우터
router.post("/posttoggle", postController.toggleLikeController);

// 게시물 좋아요 토글 라우터
router.post("/magazinetoggle", magazineController.magazineToggleLikeController);

// 게시물 좋아요 토글 라우터
router.post("/recipetoggle", recipeController.recipeToggleLikeController);

// 좋아요 삭제
router.delete("/:id", likeController.deleteLike);

// 포스트 좋아요 상태
router.post("/post/:post_id", postController.getPostWithLikeStatusController);

router.post(
  "/magazine/:post_id",
  magazineController.getMagazinePostWithLikeStatusController
);

router.post(
  "/recipe/:post_id",
  recipeController.getRecipeWithLikeStatusController
);

module.exports = router;
