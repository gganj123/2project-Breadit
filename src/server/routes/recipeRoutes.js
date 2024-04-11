const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");

// POST 요청: 레시피 생성
router.post("/", recipeController.createRecipe);

// GET 요청: 모든 레시피 가져오기
router.get("/", recipeController.getAllRecipes);

// GET 요청: 특정 레시피 가져오기
router.get("/:id", recipeController.getRecipeById);

// GET 요청: 모든 레시피 가져오기 (부분 검색 포함)
router.get("/:searchQuery", recipeController.getAllRecipes);

// PUT 요청: 포스트 업데이트
router.put("/:id", recipeController.updateRecipe);

// DELETE 요청: 포스트 삭제
router.delete("/:id", recipeController.deleteRecipe);

// GET 요청에 대한 라우터 설정: 레시피의 댓글 필터링
// router.get('/:id/comments', recipeController.getCommentsForRecipe);

module.exports = router;
