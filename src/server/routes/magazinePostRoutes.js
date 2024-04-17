const express = require("express");
const router = express.Router();
const magazineController = require("../controllers/magazinePostController");

// 매거진 포스트 생성
router.post("/", magazineController.createMagazinePost);

// 모든 매거진 포스트 가져오기
router.get("/", magazineController.getAllMagazinePostsController);

// 특정 매거진 포스트 가져오기
router.get("/:id", magazineController.getMagazinePostById);

// GET 요청: 모든 매거진 가져오기 (부분 검색 포함)
router.get("/:searchQuery", magazineController.getAllMagazinePostsController);

// 매거진 포스트 업데이트
router.put("/:id", magazineController.updateMagazinePost);

// 매거진 포스트 삭제
router.delete("/:id", magazineController.deleteMagazinePost);

// 매거진 포스트 선택 삭제
router.delete("/", magazineController.deleteMagazinePosts);

module.exports = router;
