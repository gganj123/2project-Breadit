const commentService = require("../service/commentService");
const commentValidator = require("../validation/commentVaildation");

// 코멘트 생성 컨트롤러
async function createComment(req, res, next) {
  try {
    const validationResult = commentValidator.validateCommentCreateReq(
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

// 코멘트 가져오기 컨트롤러
async function getAllComments(req, res, next) {
  try {
    const { post_id, user_id } = req.query;
    const comments = await commentService.getAllComments(post_id, user_id);
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
}

// 특정 코멘트 가져오기 컨트롤러
async function getCommentById(req, res, next) {
  try {
    const commentId = req.params.id;
    const comment = await commentService.getCommentById(commentId);
    if (!comment) {
      res.status(404).json({ message: "코멘트를 찾을 수 없습니다." });
      return;
    }
    res.json(comment);
  } catch (error) {
    next(error);
  }
}

// 코멘트 업데이트 컨트롤러
async function updateComment(req, res, next) {
  try {
    const validationResult = commentValidator.validateCommentUpdateReq(
      req.body
    );
    if (validationResult.error) {
      throw validationResult.error;
    }

    const commentId = req.params.id;
    const updatedComment = await commentService.updateComment(
      commentId,
      validationResult.value
    );
    res.json(updatedComment);
  } catch (error) {
    next(error);
  }
}

// 코멘트 삭제 컨트롤러
async function deleteComment(req, res, next) {
  try {
    const commentId = req.params.id;
    const deletedComment = await commentService.deleteComment(commentId);
    res.json(deletedComment);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
};
