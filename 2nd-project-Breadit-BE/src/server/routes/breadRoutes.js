const express = require("express");
const router = express.Router();
const breadController = require("../controllers/breadController");

// POST /breads - 브레드 생성
router.post("/", breadController.createBread);

// GET /breads - 모든 브레드 가져오기
router.get("/", breadController.getAllBreads);

// GET /breads/:id - 특정 브레드 가져오기
router.get("/:id", breadController.getBreadById);

// PUT /breads/:id - 브레드 업데이트
router.put("/:id", breadController.updateBread);

// DELETE /breads/:id - 브레드 삭제
router.delete("/:id", breadController.deleteBread);

module.exports = router;
