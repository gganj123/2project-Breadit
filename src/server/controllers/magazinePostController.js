const magazineService = require("../service/magazinePostService");
const magazineValidator = require("../validation/magazinePostValidation");

async function createMagazinePost(req, res, next) {
  try {
    const validationResult = magazineValidator.validateMagazinePostCreateReq(
      req.body
    );
    if (validationResult.error) {
      throw validationResult.error;
    }

    const transformedData = validationResult.value;

    const newMagazinePost = await magazineService.createMagazinePost(
      transformedData
    );

    res.status(201).json(newMagazinePost);
  } catch (error) {
    next(error);
  }
}
// 매거진 포스트 생성 컨트롤러
// async function createMagazinePost(req, res, next) {
//     try {
//         const postData = req.body;
//         const newPost = await magazineService.createMagazinePost(postData);
//         res.status(201).json(newPost);
//     } catch (error) {
//         // res.status(500).json({ message: error.message });
//         next(error);
//       }
// }

// 모든 매거진 포스트 가져오기 컨트롤러
async function getAllMagazinePosts(req, res, next) {
  try {
    if (req.query.q) {
      // 검색어가 있는 경우
      const searchQuery = req.query.q;
      const posts = await magazineService.getAllMagazinePosts(searchQuery);
      res.json(posts);
    } else {
      // 검색어가 없는 경우
      const posts = await magazineService.getAllMagazinePosts();
      res.json(posts);
    }
  } catch (error) {
    next(error);
  }
}

// 특정 매거진 포스트 가져오기 컨트롤러
async function getMagazinePostById(req, res, next) {
  try {
    const postId = req.params.id;
    const post = await magazineService.getMagazinePostById(postId);
    if (!post) {
      res.status(404).json({ message: "매거진 포스트를 찾을 수 없습니다." });
      return;
    }
    res.json(post);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
}

// 매거진 포스트 업데이트 컨트롤러
async function updateMagazinePost(req, res, next) {
  try {
    const validationResult = magazineValidator.validateMagazinePostCreateReq(
      req.body
    );
    if (validationResult.error) {
      throw validationResult.error;
    }

    const postId = req.params.id;
    const newData = validationResult.value;
    const updatedPost = await magazineService.updateMagazinePost(
      postId,
      newData
    );
    res.json(updatedPost);
  } catch (error) {
    next(error);
  }
}

// 매거진 포스트 삭제 컨트롤러
async function deleteMagazinePost(req, res, next) {
  try {
    const postId = req.params.id;
    const deletedPost = await magazineService.deleteMagazinePost(postId);
    res.json(deletedPost);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
}

// MagazinePost 모델의 댓글 필터링 컨트롤러
async function getCommentsForMagazinePost(req, res, next) {
  try {
    const postId = req.params.id;
    const comments = await magazineService.getCommentsForMagazinePost(postId);
    res.json(comments);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
}

async function toggleLike(req, res, next) {
  try {
    const { postId } = req.params;
    const userId = req.user.id; // 현재 로그인한 사용자의 ID로 가정

    const result = await likeService.toggleLike(postId, userId);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createMagazinePost,
  getAllMagazinePosts,
  getMagazinePostById,
  updateMagazinePost,
  deleteMagazinePost,
  getCommentsForMagazinePost,
  toggleLike,
};
