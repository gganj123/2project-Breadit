const CommentRepository = require("../db/repository/commentRepository");

async function createComment(commentData) {
  try {
    const newComment = await CommentRepository.createComment(commentData);
    return newComment;
  } catch (error) {
    throw new Error("Error creating comment");
  }
}

async function getAllComments(post_id, user_id) {
  try {
    let filter = {};
    if (post_id) {
      filter.post_id = post_id;
    }
    if (user_id) {
      filter.user_id = user_id;
    }
    const comments = await CommentRepository.getAllComments(filter);
    return comments;
  } catch (error) {
    throw new Error("Error fetching comments");
  }
}

async function getCommentById(commentId) {
  try {
    const comment = await CommentRepository.getCommentById(commentId);
    return comment;
  } catch (error) {
    throw new Error("Error fetching comment");
  }
}

async function updateComment(commentId, newData) {
  try {
    const updatedComment = await CommentRepository.updateComment(
      commentId,
      newData
    );
    return updatedComment;
  } catch (error) {
    throw new Error("Error updating comment");
  }
}

async function deleteComment(commentId) {
  try {
    const deletedComment = await CommentRepository.deleteComment(commentId);
    return deletedComment;
  } catch (error) {
    throw new Error("Error deleting comment");
  }
}

module.exports = {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
};
