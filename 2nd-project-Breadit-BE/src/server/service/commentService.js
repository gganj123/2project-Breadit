const CommentRepository = require("../db/repository/commentRepository");
// 댓글 생성 서비스
async function createComment(commentData) {
  const newComment = await CommentRepository.createComment(commentData);
  if (!newComment) {
    const error = new Error("댓글 생성 중 오류가 발생했습니다.");
    error.status = 500;
    throw error;
  }
  return newComment;
}

// 모든 댓글 가져오기 서비스
async function getAllComments(post_id, user_id) {
  let filter = {};
  if (post_id) {
    filter.post_id = post_id;
  }
  if (user_id) {
    filter.user_id = user_id;
  }
  const comments = await CommentRepository.getAllComments(filter);
  if (!comments) {
    const error = new Error("댓글을 찾을 수 없습니다.");
    error.status = 404;
    throw error;
  }
  return comments;
}

// 특정 댓글 가져오기 서비스
async function getCommentById(commentId) {
  const comment = await CommentRepository.getCommentById(commentId);
  if (!comment) {
    const error = new Error(
      "해당 commentId에 해당하는 댓글을 찾을 수 없습니다."
    );
    error.status = 404;
    throw error;
  }
  return comment;
}

// 댓글 업데이트 서비스
async function updateComment(commentId, newData) {
  const updatedComment = await CommentRepository.updateComment(
    commentId,
    newData
  );
  if (!updatedComment) {
    const error = new Error("댓글 업데이트 중 오류가 발생했습니다.");
    error.status = 404;
    throw error;
  }
  return updatedComment;
}

// 댓글 삭제 서비스
async function deleteComment(commentId) {
  const deletedComment = await CommentRepository.deleteComment(commentId);
  if (!deletedComment) {
    const error = new Error(
      "해당 commentId에 해당하는 댓글을 찾을 수 없습니다."
    );
    error.status = 404;
    throw error;
  }
  return deletedComment;
}

module.exports = {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
};
