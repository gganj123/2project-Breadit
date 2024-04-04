const recipeService = require('../services/recipeService');

// 레시피 생성 컨트롤러
async function createRecipe(req, res) {
    try {
        const recipeData = req.body;
        const newRecipe = await recipeService.createRecipe(recipeData);
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// 모든 레시피 가져오기 컨트롤러
async function getAllRecipes(req, res) {
    try {
        const recipes = await recipeService.getAllRecipes();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// 특정 레시피 가져오기 컨트롤러
async function getRecipeById(req, res) {
    try {
        const recipeId = req.params.id;
        const recipe = await recipeService.getRecipeById(recipeId);
        if (!recipe) {
            res.status(404).json({ message: '레시피를 찾을 수 없습니다.' });
            return;
        }
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// 레시피 업데이트 컨트롤러
async function updateRecipe(req, res) {
    try {
        const recipeId = req.params.id;
        const newData = req.body;
        const updatedRecipe = await recipeService.updateRecipe(recipeId, newData);
        res.json(updatedRecipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// 레시피 삭제 컨트롤러
async function deleteRecipe(req, res) {
    try {
        const recipeId = req.params.id;
        const deletedRecipe = await recipeService.deleteRecipe(recipeId);
        res.json(deletedRecipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// 레시피의 댓글 조회 컨트롤러
async function getCommentsForRecipe(req, res) {
    try {
        const recipeId = req.params.id;
        const comments = await recipeService.getCommentsForRecipe(recipeId);
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createRecipe,
    getAllRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe,
    getCommentsForRecipe
};