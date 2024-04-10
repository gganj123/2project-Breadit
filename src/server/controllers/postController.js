const postService = require("../service/postService");
const postValidation = require("../validation/postValidation"); // 유효성 검사 모듈 추가

// 포스트 생성 컨트롤러

async function createPost(req, res, next) {
  try {
    const postData = req.body;
    const newPost = await postService.createPost(postData);
    const validationResult = postValidation.validatePostCreateReq(postData); // 유효성 검사 수행
    if (validationResult.error) {
      throw validationResult.error;
    }
    res.status(201).json(newPost);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
}

// 모든 포스트 가져오기 컨트롤러 (부분 검색 포함)
async function getAllPosts(req, res, next) {
  try {
    if (req.query.q) {
      // 검색어가 있는 경우
      const searchQuery = req.query.q;
      const posts = await postService.getAllPosts(searchQuery);
      res.json(posts);
    } else {
      // 검색어가 없는 경우
      const posts = await postService.getAllPosts();
      res.json(posts);
    }
  } catch (error) {
    next(error);
  }
}

// 특정 포스트 가져오기 컨트롤러
async function getPostById(req, res, next) {
  try {
    const postId = req.params.id;
    const post = await postService.getPostById(postId);
    if (!post) {
      res.status(404).json({ message: "포스트를 찾을 수 없습니다." });
      return;
    }
    res.json(post);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
}

// 포스트 업데이트 컨트롤러
async function updatePost(req, res, next) {
  try {
    const postId = req.params.id;
    const newData = req.body;
    const validationResult = postValidation.validatePostUpdateReq(newData); // 유효성 검사 수행
    if (validationResult.error) {
      throw validationResult.error;
    }
    const updatedPost = await postService.updatePost(
      postId,
      validationResult.value
    );
    res.json(updatedPost);
  } catch (error) {
    next(error);
  }
}

// 포스트 삭제 컨트롤러
async function deletePost(req, res, next) {
  try {
    const postId = req.params.id;
    const deletedPost = await postService.deletePost(postId);
    res.json(deletedPost);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
}

// 포스트의 댓글 필터링 컨트롤러
async function getCommentsForPost(req, res, next) {
  try {
    const postId = req.params.id;
    const comments = await postService.getCommentsForPost(postId);
    res.json(comments);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
}

// 게시물 좋아요 토글 컨트롤러
async function toggleLikeController(req, res) {
  const { user_id, post_id } = req.body;

  try {
    // 좋아요 토글 함수 호출
    const updatedPost = await postService.toggleLike(user_id, post_id);

    // 클라이언트에 업데이트된 게시물 데이터 전송
    res.json(updatedPost);
  } catch (error) {
    // 에러 발생 시 에러 메시지 전송
    console.error("좋아요 토글 중 오류 발생:", error);
    res.status(500).json({ error: "서버 오류" });
  }
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getCommentsForPost,
  toggleLikeController,
};
