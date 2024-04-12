const Recipe = require("../db/repository/recipeRepository"); // Recipe 모델을 가져옵니다.
const Like = require("../db/repository/likeRepository"); // Like 모델을 가져옵니다.
const Bookmark = require("../db/repository/bookmarkRepository");
const { ObjectId } = require("mongoose").Types;

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
async function getAllRecipes(searchQuery) {
  try {
    let query = {};

    if (searchQuery) {
      const regex = new RegExp(searchQuery, "i");

      query = {
        $or: [
          { title: { $regex: regex } },
          { content: { $regex: regex } },
          { nickname: { $regex: regex } },
        ],
      };
    }

    const recipes = await Recipe.find(query);
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

// 게시물의 좋아요를 처리하는 함수
const mongoose = require("mongoose");

async function recipeToggleLike(user_id, post_id) {
  try {
    const userId = new ObjectId(user_id);
    const postId = new ObjectId(post_id);

    const existingLike = await Like.findOne({
      user_id: userId,
      post_id: postId,
    });

    if (existingLike) {
      await Recipe.findByIdAndUpdate(postId, {
        $inc: { like_count: -1 },
      });
      await Like.findOneAndRemove({ user_id: userId, post_id: postId });
    } else {
      await Recipe.findByIdAndUpdate(postId, { $inc: { like_count: 1 } });
      await Like.create({ user_id: userId, post_id: postId });
    }

    const updatedPost = await Recipe.findById(postId);
    return updatedPost;
  } catch (error) {
    console.error("좋아요 토글 중 오류 발생:", error);
    throw error;
  }
}

// 레시피의 좋아요 상태 함수
async function getRecipeWithLikeStatus(post_id, user_id) {
  try {
    const postId = new ObjectId(post_id);
    const userId = new ObjectId(user_id);

    const recipe = await Recipe.findById(postId);
    if (!recipe) {
      throw new Error("레시피를 찾을 수 없습니다.");
    }

    const like = await Like.findOne({
      user_id: userId,
      post_id: postId,
    });

    const isLikedByUser = like ? true : false;

    return {
      recipe: recipe,
      isLikedByUser: isLikedByUser,
    };
  } catch (error) {
    console.error("레시피 정보 조회 중 오류 발생:", error);
    throw error;
  }
}

// 레시피의 북마크 상태 함수
async function getRecipeWithBookmarkStatus(post_id, user_id) {
  try {
    const postId = new ObjectId(post_id);
    const userId = new ObjectId(user_id);

    const recipe = await Recipe.findById(postId);
    if (!recipe) {
      throw new Error("레시피를 찾을 수 없습니다.");
    }

    const bookmark = await Bookmark.findOne({
      user_id: userId,
      post_id: postId,
    });

    const isBookmarkedByUser = bookmark ? true : false;

    return {
      recipe: recipe,
      isBookmarkedByUser: isBookmarkedByUser,
    };
  } catch (error) {
    console.error("레시피 정보 조회 중 오류 발생:", error);
    throw error;
  }
}
module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  recipeToggleLike,
  getRecipeWithLikeStatus,
  getRecipeWithBookmarkStatus,
};
