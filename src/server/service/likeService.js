const Like = require('../db/repository/likeRepository');

// 좋아요 생성 함수
async function createLike(likeData) {
    try {
        const newLike = await Like.create(likeData);
        return newLike;
    } catch (error) {
        throw new Error('좋아요를 생성하는 중 오류가 발생했습니다.');
    }
}

// 모든 좋아요 조회 함수
async function getAllLikes() {
    try {
        const likes = await Like.find();
        return likes;
    } catch (error) {
        throw new Error('모든 좋아요를 조회하는 중 오류가 발생했습니다.');
    }
}

// 특정 사용자의 좋아요 조회 함수
async function getUserLikes(userId) {
    try {
        const userLikes = await Like.find({ user_id: userId });
        return userLikes;
    } catch (error) {
        throw new Error('사용자의 좋아요를 조회하는 중 오류가 발생했습니다.');
    }
}

// 특정 게시물의 좋아요 조회 함수
async function getPostLikes(postId) {
    try {
        const postLikes = await Like.find({ post_id: postId });
        return postLikes;
    } catch (error) {
        throw new Error('게시물의 좋아요를 조회하는 중 오류가 발생했습니다.');
    }
}

// 좋아요 삭제 함수

async function deleteLike(likeId) {
    try {
        const deletedLike = await Like.findByIdAndDelete(likeId);
        if (!deletedLike) {
            throw new Error('해당 ID에 해당하는 좋아요를 찾을 수 없습니다.');
        }
        return deletedLike;
    } catch (error) {
        throw new Error('좋아요 삭제 중 오류가 발생했습니다.');
    }
}

module.exports = {
    createLike,
    getAllLikes,
    getUserLikes,
    getPostLikes,
    deleteLike
};