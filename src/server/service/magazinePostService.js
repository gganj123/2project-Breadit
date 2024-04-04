// MagazinePost 모델을 가져옴
const MagazinePost = require('../db/repository/magazinePost'); 

// 매거진 포스트 생성
async function createMagazinePost(postData) {
  try {
    const newPost = await MagazinePost.create(postData);
    return newPost;
  } catch (error) {
    throw new Error('매거진 포스트 생성 중 오류가 발생했습니다.');
  }
}

// 모든 매거진 포스트 가져오기
async function getAllMagazinePosts() {
  try {
    const posts = await MagazinePost.find();
    return posts;
  } catch (error) {
    throw new Error('매거진 포스트 조회 중 오류가 발생했습니다.');
  }
}

// 특정 매거진 포스트 가져오기
async function getMagazinePostById(postId) {
  try {
    const post = await MagazinePost.findById(postId);
    return post;
  } catch (error) {
    throw new Error('매거진 포스트 조회 중 오류가 발생했습니다.');
  }
}

// 매거진 포스트 업데이트
async function updateMagazinePost(postId, newData) {
  try {
    const updatedPost = await MagazinePost.findByIdAndUpdate(postId, newData, { new: true });
    return updatedPost;
  } catch (error) {
    throw new Error('매거진 포스트 업데이트 중 오류가 발생했습니다.');
  }
}

// 매거진 포스트 삭제
async function deleteMagazinePost(postId) {
  try {
    const deletedPost = await MagazinePost.findByIdAndDelete(postId);
    return deletedPost;
  } catch (error) {
    throw new Error('매거진 포스트 삭제 중 오류가 발생했습니다.');
  }
}

// MagazinePost 모델의 댓글 필터링 함수
async function getCommentsForMagazinePost(postId) {
    try {
      const magazinePost = await MagazinePost.findById(postId).populate('comment_id');
      if (!magazinePost) {
        throw new Error('매거진 포스트를 찾을 수 없습니다.');
      }
      return magazinePost.comment_id;
    } catch (error) {
      throw new Error('댓글 조회 중 오류가 발생했습니다.');
    }
  }

module.exports = {
  createMagazinePost,
  getAllMagazinePosts,
  getMagazinePostById,
  updateMagazinePost,
  deleteMagazinePost,
  getCommentsForMagazinePost
};