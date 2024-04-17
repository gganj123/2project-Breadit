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

async function getAllRecipes(searchQuery, limit, sortBy) {
  // limit와 sortBy 매개변수 추가
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

    let sortOptions = {}; // 정렬 옵션을 저장할 객체를 초기화합니다.
    if (sortBy === "like_count") {
      sortOptions = { like_count: -1 }; // like_count가 높은 순으로 정렬합니다.
    }

    const recipes = await Recipe.find(query)
      .sort(sortOptions) // 정렬 옵션을 적용합니다.
      .limit(limit); // limit 매개변수 사용

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

//특정 레시피 조회
async function getRecipeById(postId) {
  try {
    const recipe = await Recipe.findById(postId);
    if (!recipe) {
      const error = new Error("recipeId에 해당하는 레시피를 찾을 수 없습니다.");
      error.status = 404;
      throw error;
    }

    const like = await Like.findOne({
      user_id: userId,
      post_id: postId,
    });

    const bookmark = await Bookmark.findOne({
      user_id: userId,
      post_id: postId,
    });

    const beLike = like ? true : false;
    const beBookmark = bookmark ? true : false;

    return { recipe, beLike, beBookmark };
  } catch (error) {
    throw error;
  }
}

async function getUserRecipes(userId, searchQuery, page, limit) {
  try {
    let query = { userId };

    if (searchQuery) {
      const regex = new RegExp(searchQuery, "i");

      query.$and = [
        {
          $or: [
            { title: { $regex: regex } },
            { content: { $regex: regex } },
            { nickname: { $regex: regex } },
          ],
        },
        { userId },
      ];
    }

    const totalCount = await Recipe.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);

    const recipes = await Recipe.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    if (!recipes || recipes.length === 0) {
      const error = new Error("레시피를 찾을 수 없습니다.");
      error.status = 404;
      throw error;
    }

    return {
      totalCount,
      totalPages,
      recipes,
    };
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

// 레시피 선택 삭제 서비스
async function deleteRecipes(recipeIds) {
  try {
    // Use deleteMany to delete multiple recipes based on their ids
    const deletedRecipes = await Recipe.deleteMany({
      _id: { $in: recipeIds },
    });

    // Check if any recipes were deleted
    if (deletedRecipes.deletedCount === 0) {
      // If no recipes were deleted, throw an error
      const error = new Error("삭제할 레시피가 없습니다.");
      error.status = 404;
      throw error;
    }

    return deletedRecipes;
  } catch (error) {
    throw error;
  }
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

// 레시피의 북마크 토글 함수
async function recipeToggleBookmark(user_id, recipe_id) {
  try {
    const userId = new ObjectId(user_id);
    const recipeId = new ObjectId(recipe_id);

    const existingBookmark = await Bookmark.findOne({
      user_id: userId,
      post_id: recipeId,
    });

    if (existingBookmark) {
      await Bookmark.findOneAndRemove({ user_id: userId, post_id: recipeId });
    } else {
      await Bookmark.create({ user_id: userId, post_id: recipeId });
    }

    const updatedRecipe = await Recipe.findById(recipeId);
    return updatedRecipe;
  } catch (error) {
    console.error("북마크 토글 중 오류 발생:", error);
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
  getUserRecipes,
  updateRecipe,
  deleteRecipe,
  deleteRecipes,
  recipeToggleLike,
  recipeToggleBookmark,
  getRecipeWithLikeStatus,
  getRecipeWithBookmarkStatus,
};
