const express = require("express");
const router = express.Router();
const bookmarkController = require("../controllers/bookmarkController");
const magazineController = require("../controllers/magazinePostController");
const recipeController = require("../controllers/recipeController");
const postController = require("../controllers/postController");

// 북마크 생성
router.post("/", bookmarkController.createBookmark);

// 모든 북마크 조회
router.get("/", bookmarkController.getAllBookmarks);

// 북마크 삭제
router.delete("/:id", bookmarkController.deleteBookmark);

//매거진 북마크 상태 호출
router.post(
  "/magazine/:post_id",
  magazineController.getMagazinePostWithBookmarkStatusController
);

router.post(
  "/recipe/:post_id",
  recipeController.getRecipeWithBookmarkStatusController
);

router.post(
  "/post/:post_id",
  postController.getPostWithBookmarkStatusController
);

// 매거진 북마크 토글 라우터
router.post(
  "/magazinebooktoggle",
  magazineController.magazineToggleBookmarkController
);

// 레시피 북마크 토글 라우터
router.post(
  "/recipebooktoggle",
  recipeController.recipeToggleBookmarkController
);

// 추천포스트 북마크 토글 라우터
router.post("/postbooktoggle", postController.postToggleBookmarkController);

module.exports = router;
