
const Recipe = require('../db/repository/recipe'); // Recipe 모델을 가져옵니다.

// 레시피 생성 서비스
async function createRecipe(recipeData) {
  try {
    const newRecipe = await Recipe.create(recipeData);
    return newRecipe;
  } catch (error) {
    throw new Error('레시피 생성 중 오류가 발생했습니다.');
  }
}

// 모든 레시피 가져오기 서비스
async function getAllRecipes() {
  try {
    const recipes = await Recipe.find();
    return recipes;
  } catch (error) {
    throw new Error('레시피 조회 중 오류가 발생했습니다.');
  }
}

// 특정 레시피 가져오기 서비스
async function getRecipeById(recipeId) {
  try {
    const recipe = await Recipe.findById(recipeId);
    return recipe;
  } catch (error) {
    throw new Error('레시피 조회 중 오류가 발생했습니다.');
  }
}

// 레시피 업데이트 서비스
async function updateRecipe(recipeId, newData) {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, newData, { new: true });
    return updatedRecipe;
  } catch (error) {
    throw new Error('레시피 업데이트 중 오류가 발생했습니다.');
  }
}

// 레시피 삭제 서비스
async function deleteRecipe(recipeId) {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);
    return deletedRecipe;
  } catch (error) {
    throw new Error('레시피 삭제 중 오류가 발생했습니다.');
  }
}

// 레시피 댓글 조회 서비스
async function getCommentsForRecipe(recipeId) {
    try {
      const recipe = await Recipe.findById(recipeId).populate('comment_id');
      if (!recipe) {
        throw new Error('레시피를 찾을 수 없습니다.');
      }
      return recipe.comment_id;
    } catch (error) {
      throw new Error('댓글 조회 중 오류가 발생했습니다.');
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