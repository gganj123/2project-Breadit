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

//유저아이디로 매거진 가져오기
router.get("/user/:user_id", recipeController.getUserRecipesController);

// PUT 요청: 포스트 업데이트
router.put("/:id", recipeController.updateRecipe);

// 레시피 삭제 요청: DELETE /recipes/:id
router.delete("/:id", recipeController.deleteRecipe);

// DELETE 요청: 레시피 선택 삭제
router.delete("/", recipeController.deleteRecipes);

module.exports = router;
