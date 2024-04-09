const commentService = require("../service/commentService");
const magazineValidator = require("../validation/commentVaildation");

async function createComment(req, res, next) {
  try {
    const validationResult = magazineValidator.validateCommentCreateReq(
      req.body
    );
    if (validationResult.error) {
      throw validationResult.error;
    }

    const newComment = await commentService.createComment(
      validationResult.value
    );
    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
}
// 댓글 생성 컨트롤러
// async function createComment(req, res, next) {
//   try {
//     const commentData = req.body;
//     const newComment = await commentService.createComment(commentData);
//     res.status(201).json(newComment);
//   } catch (error) {
//     throw error;
//   }
// }

// 모든 댓글 가져오기 컨트롤러
async function getAllComments(req, res, next) {
  try {
    const comments = await commentService.getAllComments();
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
}

// 특정 댓글 가져오기 컨트롤러
async function getCommentById(req, res, next) {
  try {
    const commentId = req.params.id;
    const comment = await commentService.getCommentById(commentId);
    if (!comment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
}

// 특정 사용자의 댓글 가져오기 컨트롤러
async function getCommentsByUserId(req, res, next) {
  try {
    const userId = req.params.userId;
    const comments = await commentService.getCommentsByUserId(userId);
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
}

// 특정 포스트의 댓글 가져오기 컨트롤러
async function getCommentsByPostId(req, res, next) {
  try {
    const postId = req.params.postId;
    const comments = await commentService.getCommentsByPostId(postId);
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
}

// 댓글 업데이트 컨트롤러
// async function updateComment(req, res, next) {
//   try {
//     const commentId = req.params.id;
//     const newData = req.body;
//     const updatedComment = await commentService.updateComment(
//       commentId,
//       newData
//     );
//     res.status(200).json(updatedComment);
//   } catch (error) {
//     next(error);
//   }
// }
// 댓글 수정 컨트롤러
async function updateComment(req, res, next) {
  try {
    const commentId = req.params.id;
    const newData = req.body;

    // 유효성 검사 수행
    const validationResult =
      magazineValidator.validateCommentUpdateReq(newData);
    if (validationResult.error) {
      throw validationResult.error;
    }

    // 댓글 업데이트 서비스 호출
    const updatedComment = await commentService.updateComment(
      commentId,
      validationResult.value
    );

    // 업데이트된 댓글을 클라이언트에 응답
    res.status(200).json(updatedComment);
  } catch (error) {
    next(error);
  }
}

// 댓글 삭제 컨트롤러
async function deleteComment(req, res, next) {
  try {
    const commentId = req.params.id;
    const deletedComment = await commentService.deleteComment(commentId);
    res.status(200).json(deletedComment);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createComment,
  getAllComments,
  getCommentById,
  getCommentsByUserId,
  getCommentsByPostId,
  updateComment,
  deleteComment,
};
