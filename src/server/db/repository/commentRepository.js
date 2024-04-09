const Comment = require("../schema/comment");

async function createComment(commentData) {
  try {
    const newComment = await Comment.create(commentData);
    return newComment;
  } catch (error) {
    error.status = 500;
    error.message = "코멘트 생성중 오류가 발생했습니다.";
    throw error;
  }
}

async function getAllComments() {
  try {
    const comments = await Comment.find();
    return comments;
  } catch (error) {
    throw new Error("모든 코멘트 조회 중 오류가 발생했습니다.");
  }
}

async function getCommentById(commentId) {
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new Error("해당 코멘트를 찾을 수 없습니다.");
    }
    return comment;
  } catch (error) {
    throw new Error("코멘트 조회 중 오류가 발생했습니다.");
  }
}

async function updateComment(commentId, newCommentData) {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      newCommentData,
      { new: true }
    );
    if (!updatedComment) {
      throw new Error("해당 코멘트를 찾을 수 없습니다.");
    }
    return updatedComment;
  } catch (error) {
    throw new Error("코멘트 업데이트 중 오류가 발생했습니다.");
  }
}

async function deleteComment(commentId) {
  try {
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      throw new Error("해당 코멘트를 찾을 수 없습니다.");
    }
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
