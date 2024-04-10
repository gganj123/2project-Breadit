const Recipe = require("../db/repository/recipeRepository"); // Recipe 모델을 가져옵니다.

// 레시피 생성 서비스
async function createRecipe(recipeData) {
  const newRecipe = await Recipe.create(recipeData);
  if (!newRecipe) {
    const error = new Error("레시피 생성 중 오류가 발생했습니다.");
    error.status = 500;
    throw error;
  }
  return newRecipe;
}

// 모든 레시피 가져오기 서비스
async function getAllRecipes() {
  try {
    const recipes = await Recipe.find();
    if (!recipes || recipes.length === 0) {
      const error = new Error("레시피를 찾을 수 없습니다.");
      error.status = 404;
      throw error;
    }
    return recipes;
  } catch (error) {
    throw error;
  }
}

// 특정 레시피 가져오기 서비스
async function getRecipeById(recipeId) {
  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      const error = new Error("recipeId에 해당하는 레시피가 없습니다.");
      error.status = 404;
      throw error;
    }
    return recipe;
  } catch (error) {
    throw error;
  }
}

// 레시피 업데이트 서비스
async function updateRecipe(recipeId, newData) {
  const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, newData, {
    new: true,
  });
  if (!updatedRecipe) {
    const error = new Error(
      "recipeId에 해당하는 레시피를 찾을 수 없어 업데이트할 수 없습니다."
    );
    error.status = 404;
    throw error;
  }
  return updatedRecipe;
}

// 레시피 삭제 서비스
async function deleteRecipe(recipeId) {
  const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);
  if (!deletedRecipe) {
    const error = new Error(
      "recipeId에 해당하는 레시피를 찾을 수 없어 삭제할 수 없습니다."
    );
    error.status = 404;
    throw error;
  }
  return deletedRecipe;
}

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
