const recipeService = require("../service/recipeService");
const recipeValidation = require("../validation/recipeValidation");
// 레시피 생성 컨트롤러
async function createRecipe(req, res, next) {
  try {
    const recipeData = req.body;

    // 요청 데이터의 유효성 검사
    const validationResult =
      recipeValidation.validateRecipeCreateReq(recipeData);
    if (validationResult.error) {
      throw validationResult.error;
    }

    // 레시피 생성
    const newRecipe = await recipeService.createRecipe(validationResult.value);
    res.status(201).json(newRecipe);
  } catch (error) {
    next(error);
  }
}

// 모든 레시피 가져오기 컨트롤러
async function getAllRecipes(req, res, next) {
  try {
    const recipes = await recipeService.getAllRecipes();
    res.json(recipes);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
}

// 특정 레시피 가져오기 컨트롤러
async function getRecipeById(req, res, next) {
  try {
    const recipeId = req.params.id;
    const recipe = await recipeService.getRecipeById(recipeId);
    if (!recipe) {
      res.status(404).json({ message: "레시피를 찾을 수 없습니다." });
      return;
    }
    res.json(recipe);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
}

// 레시피 업데이트 컨트롤러
async function updateRecipe(req, res, next) {
  try {
    const recipeId = req.params.id;
    const newData = req.body;

    // 요청 데이터의 유효성 검사
    const validationResult = recipeValidation.validateRecipeUpdateReq(newData);
    if (validationResult.error) {
      throw validationResult.error;
    }

    // 레시피 업데이트
    const updatedRecipe = await recipeService.updateRecipe(
      recipeId,
      validationResult.value
    );
    res.json(updatedRecipe);
  } catch (error) {
    next(error);
  }
}

// 레시피 삭제 컨트롤러
async function deleteRecipe(req, res, next) {
  try {
    const recipeId = req.params.id;
    const deletedRecipe = await recipeService.deleteRecipe(recipeId);
    res.json(deletedRecipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
    next(error);
  }
}

// 레시피의 댓글 조회 컨트롤러
async function getCommentsForRecipe(req, res, next) {
  try {
    const recipeId = req.params.id;
    const comments = await recipeService.getCommentsForRecipe(recipeId);
    res.json(comments);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
}

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  getCommentsForRecipe,
};
