// MagazinePost 모델을 가져옴
const MagazinePost = require("../db/repository/magazinePostRepository");
const Comment = require("../db/repository/commentRepository");
// 매거진 포스트 생성
async function createMagazinePost(postData) {
  const newPost = await MagazinePost.create(postData);
  if (!newPost) {
    const error = new Error("매거진 포스트를 생성할 수 없습니다.");
    error.status = 500;
    throw error;
  }
  return newPost;
}

// 모든 매거진 포스트 가져오기
async function getAllMagazinePosts() {
  try {
    const posts = await MagazinePost.find();
    if (!posts || posts.length === 0) {
      const error = new Error("매거진 글을 찾을 수 없습니다.");
      error.status = 404;
      throw error;
    }
    return posts;
  } catch (error) {
    throw error;
  }
}

// 특정 매거진 포스트 가져오기
async function getMagazinePostById(postId) {
  try {
    const post = await MagazinePost.findById(postId);
    if (!post) {
      const error = new Error(
        "postId에 해당하는 매거진 글을 찾을 수 없습니다."
      );
      error.status = 404;
      throw error;
    }
    return post;
  } catch (error) {
    throw error;
  }
}

// 매거진 포스트 업데이트
async function updateMagazinePost(postId, newData) {
  const updatedPost = await MagazinePost.findByIdAndUpdate(postId, newData, {
    new: true,
  });
  if (!updatedPost) {
    const error = new Error(
      "postId에 해당하는 매거진 포스트를 찾을 수 없습니다."
    );
    error.status = 404;
    throw error;
  }
  return updatedPost;
}

// 매거진 포스트 삭제
async function deleteMagazinePost(postId) {
  const deletedPost = await MagazinePost.findByIdAndDelete(postId);
  if (!deletedPost) {
    const error = new Error(
      "postId에 해당하는 매거진 포스트를 찾을 수 없습니다."
    );
    error.status = 404;
    throw error;
  }
  return deletedPost;
}

// MagazinePost 모델의 댓글 필터링 함수
// async function getCommentsForMagazinePost(postId) {
//     try {
//       const magazinePost = await MagazinePost.findById(postId).populate('comment_id');
//       if (!magazinePost) {
//         throw new Error('매거진 포스트를 찾을 수 없습니다.');
//       }
//       return magazinePost.comment_id;
//     } catch (error) {
//       throw new Error('댓글 조회 중 오류가 발생했습니다.');
//     }
//   }

// MagazinePost 모델의 댓글 필터링 함수
async function getCommentsForMagazinePost(postId) {
  const comments = await Comment.find({ post_id: postId });
  if (comments.length === 0) {
    const error = new Error("해당 매거진 글에 연결된 댓글이 없습니다.");
    error.status = 404;
    throw error;
  }
}

module.exports = {
  createMagazinePost,
  getAllMagazinePosts,
  getMagazinePostById,
  updateMagazinePost,
  deleteMagazinePost,
  getCommentsForMagazinePost,
};
