const Bookmark = require('../db/repository/bookmarkRepository');

// 북마크 생성 함수
async function createBookmark(bookmarkData) {
    try {
        const newBookmark = await Bookmark.create(bookmarkData);
        return newBookmark;
    } catch (error) {
        throw new Error('북마크를 생성하는 중 오류가 발생했습니다.');
    }
}

// 모든 북마크 조회 함수
async function getAllBookmarks() {
    try {
        const bookmarks = await Bookmark.find();
        return bookmarks;
    } catch (error) {
        throw new Error('모든 북마크를 조회하는 중 오류가 발생했습니다.');
    }
}

// 특정 사용자의 북마크 조회 함수
async function getUserBookmarks(userId) {
    try {
        const userBookmarks = await Bookmark.find({ user_id: userId });
        return userBookmarks;
    } catch (error) {
        throw new Error('사용자의 북마크를 조회하는 중 오류가 발생했습니다.');
    }
}

// 특정 포스트의 북마크 조회 함수
async function getPostBookmarks(postId) {
    try {
        const postBookmarks = await Bookmark.find({ post_id: postId });
        return postBookmarks;
    } catch (error) {
        throw new Error('포스트의 북마크를 조회하는 중 오류가 발생했습니다.');
    }
}

// 북마크 삭제 함수
async function deleteBookmark(bookmarkId) {
    try {
        const deletedBookmark = await Bookmark.findByIdAndDelete(bookmarkId);
        if (!deletedBookmark) {
            throw new Error('해당 ID에 해당하는 북마크를 찾을 수 없습니다.');
        }
        return deletedBookmark;
    } catch (error) {
        throw new Error('북마크 삭제 중 오류가 발생했습니다.');
    }
}

module.exports = {
    createBookmark,
    getAllBookmarks,
    getUserBookmarks,
    getPostBookmarks,
    deleteBookmark
};