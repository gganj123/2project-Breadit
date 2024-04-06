const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// POST 요청에 대한 라우터 설정
router.post('/', recipeController.createRecipe);

// GET 요청에 대한 라우터 설정
router.get('/', recipeController.getAllRecipes);
router.get('/:id', recipeController.getRecipeById);

// PUT 요청에 대한 라우터 설정
router.put('/:id', recipeController.updateRecipe);

// DELETE 요청에 대한 라우터 설정
router.delete('/:id', recipeController.deleteRecipe);

// GET 요청에 대한 라우터 설정: 레시피의 댓글 필터링
router.get('/:id/comments', recipeController.getCommentsForRecipe);

module.exports = router;