const CommentRepository = require("../db/repository/commentRepository");

async function createComment(commentData) {
  try {
    const newComment = await CommentRepository.createComment(commentData);
    return newComment;
  } catch (error) {
    error.status = 500;
    error.message = "댓글 생성 중 오류가 발생했습니다.";
    throw error;
  }
}

async function getAllComments() {
  try {
    const comments = await CommentRepository.getAllComments();
    return comments;
  } catch (error) {
    throw new Error("모든 코멘트 조회 중 오류가 발생했습니다.");
  }
}

async function getCommentById(commentId) {
  try {
    const comment = await CommentRepository.getCommentById(commentId);
    return comment;
  } catch (error) {
    throw new Error("코멘트 조회 중 오류가 발생했습니다.");
  }
}

async function updateComment(commentId, newCommentData) {
  try {
    const updatedComment = await CommentRepository.updateComment(
      commentId,
      newCommentData
    );
    return updatedComment;
  } catch (error) {
    throw new Error("코멘트 업데이트 중 오류가 발생했습니다.");
  }
}

async function deleteComment(commentId) {
  try {
    const deletedComment = await CommentRepository.deleteComment(commentId);
    return deletedComment;
  } catch (error) {
    throw new Error("코멘트 삭제 중 오류가 발생했습니다.");
  }
}

module.exports = {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
};
