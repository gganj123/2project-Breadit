const Comment = require('../schema/comment'); // Comment 모델을 가져옵니다.

// 댓글 생성
async function createComment(commentData) {
  try {
    const newComment = await Comment.create(commentData);
    return newComment;
  } catch (error) {
    throw new Error('댓글 생성 중 오류가 발생했습니다.');
  }
}

// 댓글 조회
async function getCommentById(commentId) {
  try {
    const comment = await Comment.findById(commentId);
    return comment;
  } catch (error) {
    throw new Error('댓글 조회 중 오류가 발생했습니다.');
  }
}

// 댓글 수정
async function updateComment(commentId, updatedData) {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(commentId, updatedData, { new: true });
    return updatedComment;
  } catch (error) {
    throw new Error('댓글 수정 중 오류가 발생했습니다.');
  }
}

// 댓글 삭제
async function deleteComment(commentId) {
  try {
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    return deletedComment;
  } catch (error) {
    throw new Error('댓글 삭제 중 오류가 발생했습니다.');
  }
}


// MagazinePost 모델의 댓글 필터링 함수
async function getCommentsForMagazinePost(postId) {
  try {
    const comments = await Comment.find({ post_id: postId });
    return comments;
  } catch (error) {
    throw new Error('댓글 조회 중 오류가 발생했습니다.');
  }
}

async function getCommentsForPost(postId) {
    try {
      const comments = await Comment.find({ post_id: postId });
      return comments;
    } catch (error) {
      throw new Error('댓글 조회 중 오류가 발생했습니다.');
    }
  }

async function getCommentsForRecipe(recipeId) {
    try {
      const comments = await Comment.find({ post_id: recipeId });
      return comments;
    } catch (error) {
      throw new Error('댓글 조회 중 오류가 발생했습니다.');
    }
  }
  

module.exports = {
        createComment,
        getCommentById,
        updateComment,
        deleteComment,
        getCommentsForMagazinePost,
        getCommentsForPost,
        getCommentsForRecipe,
};