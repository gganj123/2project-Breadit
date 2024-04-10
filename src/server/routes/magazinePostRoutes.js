const express = require("express");
const router = express.Router();
const magazineController = require("../controllers/magazinePostController");

// 매거진 포스트 생성
router.post("/", magazineController.createMagazinePost);

// 모든 매거진 포스트 가져오기
router.get("/", magazineController.getAllMagazinePosts);

// 특정 매거진 포스트 가져오기
router.get("/:id", magazineController.getMagazinePostById);

// 매거진 포스트 업데이트
router.put("/:id", magazineController.updateMagazinePost);

// 매거진 포스트 삭제
router.delete("/:id", magazineController.deleteMagazinePost);

// MagazinePost 모델의 댓글 필터링
// router.get("/:id/comments", magazineController.getCommentsForMagazinePost);

module.exports = router;
