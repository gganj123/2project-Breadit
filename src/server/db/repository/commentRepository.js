const Comment = require("../schema/comment");

async function createComment(commentData) {
  try {
    const newComment = await Comment.create(commentData);
    return newComment;
  } catch (error) {
    throw new Error("Error creating comment");
  }
}

async function getAllComments(filter) {
  try {
    const comments = await Comment.find(filter);
    return comments;
  } catch (error) {
    throw new Error("Error fetching comments from database");
  }
}

async function getCommentById(commentId) {
  try {
    const comment = await Comment.findById(commentId);
    return comment;
  } catch (error) {
    throw new Error("Error fetching comment");
  }
}

async function updateComment(commentId, newData) {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(commentId, newData, {
      new: true,
    });
    return updatedComment;
  } catch (error) {
    throw new Error("Error updating comment");
  }
}

async function deleteComment(commentId) {
  try {
    const deletedComment = await Comment.findByIdAndDelete(commentId);
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
