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
    if (req.query.q) {
      // 검색어가 있는 경우
      const searchQuery = req.query.q;
      const posts = await recipeService.getAllRecipes(searchQuery);
      res.json(posts);
    } else {
      // 검색어가 없는 경우
      const posts = await recipeService.getAllRecipes();
      res.json(posts);
    }
  } catch (error) {
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
// 게시물 좋아요 토글 컨트롤러
async function recipeToggleLikeController(req, res) {
  const { user_id, post_id } = req.body;

  try {
    // 좋아요 토글 함수 호출
    const updatedPost = await recipeService.recipeToggleLike(user_id, post_id);

    // 클라이언트에 업데이트된 게시물 데이터 전송
    res.json(updatedPost);
  } catch (error) {
    // 에러 발생 시 에러 메시지 전송
    console.error("좋아요 토글 중 오류 발생:", error);
    res.status(500).json({ error: "서버 오류" });
  }
}

// 레시피 좋아요 상태 호출
async function getRecipeWithLikeStatusController(req, res, next) {
  const { post_id } = req.params;
  const user_id = req.body.user_id; // 가정: 사용자 ID는 요청 객체의 user 속성에 저장되어 있음
  try {
    const postInfo = await recipeService.getRecipeWithLikeStatus(
      post_id,
      user_id
    );
    res.json(postInfo);
  } catch (error) {
    console.error("레시피 정보 조회 중 오류 발생:", error);
    res.status(500).json({
      message: "레시피 정보를 가져오는 중 오류가 발생했습니다.",
    });
  }
}

// 레시피 북마크 상태 호출
async function getRecipeWithBookmarkStatusController(req, res, next) {
  const { post_id } = req.params;
  const user_id = req.body.user_id; // 가정: 사용자 ID는 요청 객체의 user 속성에 저장되어 있음
  try {
    const postInfo = await recipeService.getRecipeWithBookmarkStatus(
      post_id,
      user_id
    );
    res.json(postInfo);
  } catch (error) {
    console.error("레시피 정보 조회 중 오류 발생:", error);
    res.status(500).json({
      message: "레시피 정보를 가져오는 중 오류가 발생했습니다.",
    });
  }
}

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  recipeToggleLikeController,
  getRecipeWithLikeStatusController,
  getRecipeWithBookmarkStatusController,
};
