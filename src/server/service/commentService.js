const Comment = require('../db/repository/commentRepository'); // Comment 모델을 가져옵니다.

// 댓글 생성 서비스
async function createComment(commentData) {
  try {
    const newComment = await Comment.create(commentData);
    return newComment;
  } catch (error) {
    throw new Error('댓글 생성 중 오류가 발생했습니다.');
  }
}

// 모든 댓글 가져오기 서비스
async function getAllComments() {
  try {
    const comments = await Comment.find();
    return comments;
  } catch (error) {
    throw new Error('댓글 조회 중 오류가 발생했습니다.');
  }
}

// 특정 댓글 가져오기 서비스
async function getCommentById(commentId) {
  try {
    const comment = await Comment.findById(commentId);
    return comment;
  } catch (error) {
    throw new Error('댓글 조회 중 오류가 발생했습니다.');
  }
}

// 특정 사용자의 댓글 가져오기 서비스
async function getCommentsByUserId(userId) {
  try {
    const comments = await Comment.find({ user_id: userId });
    return comments;
  } catch (error) {
    throw new Error('사용자 댓글 조회 중 오류가 발생했습니다.');
  }
}

// 댓글 업데이트 서비스
async function updateComment(commentId, newData) {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(commentId, newData, { new: true });
    return updatedComment;
  } catch (error) {
    throw new Error('댓글 업데이트 중 오류가 발생했습니다.');
  }
}

// 댓글 삭제 서비스
async function deleteComment(commentId) {
  try {
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    return deletedComment;
  } catch (error) {
    throw new Error('댓글 삭제 중 오류가 발생했습니다.');
  }
}

module.exports = {
  createComment,
  getAllComments,
  getCommentById,
  getCommentsByUserId,
  updateComment,
  deleteComment,
};