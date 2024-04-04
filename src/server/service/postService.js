const Post = require('../db/schema/post'); // Post 모델을 가져옵니다.

// 포스트 생성 서비스
async function createPost(postData) {
  try {
    const newPost = await Post.create(postData);
    return newPost;
  } catch (error) {
    throw new Error('포스트 생성 중 오류가 발생했습니다.');
  }
}

// 모든 포스트 가져오기 서비스
async function getAllPosts() {
  try {
    const posts = await Post.find();
    return posts;
  } catch (error) {
    throw new Error('포스트 조회 중 오류가 발생했습니다.');
  }
}

// 특정 포스트 가져오기 서비스
async function getPostById(postId) {
  try {
    const post = await Post.findById(postId);
    return post;
  } catch (error) {
    throw new Error('포스트 조회 중 오류가 발생했습니다.');
  }
}

// 포스트 업데이트 서비스
async function updatePost(postId, newData) {
  try {
    const updatedPost = await Post.findByIdAndUpdate(postId, newData, { new: true });
    return updatedPost;
  } catch (error) {
    throw new Error('포스트 업데이트 중 오류가 발생했습니다.');
  }
}

// 포스트 삭제 서비스
async function deletePost(postId) {
  try {
    const deletedPost = await Post.findByIdAndDelete(postId);
    return deletedPost;
  } catch (error) {
    throw new Error('포스트 삭제 중 오류가 발생했습니다.');
  }
}

// 포스트의 댓글 필터링 서비스
async function getCommentsForPost(postId) {
  try {
    const post = await Post.findById(postId).populate('comment_id');
    if (!post) {
      throw new Error('포스트를 찾을 수 없습니다.');
    }
    return post.comment_id;
  } catch (error) {
    throw new Error('댓글 조회 중 오류가 발생했습니다.');
  }
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getCommentsForPost
};