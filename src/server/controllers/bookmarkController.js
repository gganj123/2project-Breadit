const bookmarkService = require('../service/bookmarkService');

// 북마크 생성 컨트롤러
async function createBookmark(req, res) {
    try {
        const bookmarkData = req.body;
        const newBookmark = await bookmarkService.createBookmark(bookmarkData);
        res.status(201).json(newBookmark);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// 모든 북마크 조회 컨트롤러
async function getAllBookmarks(req, res, next) {
    try {
        const bookmarks = await bookmarkService.getAllBookmarks();
        res.json(bookmarks);
    } catch (error) {
        next(error);
    }
}

// 특정 사용자의 북마크 조회 컨트롤러
async function getUserBookmarks(req, res, next) {
    const userId = req.params.userId;
    try {
        const userBookmarks = await bookmarkService.getUserBookmarks(userId);
        res.json(userBookmarks);
    } catch (error) {
        next(error);
    }
}

// 특정 포스트의 북마크 조회 컨트롤러
async function getPostBookmarks(req, res, next) {
    const postId = req.params.postId;
    try {
        const postBookmarks = await bookmarkService.getPostBookmarks(postId);
        res.json(postBookmarks);
    } catch (error) {
        next(error);
    }
}

// 북마크 삭제 컨트롤러
async function deleteBookmark(req, res, next) {
    const bookmarkId = req.params.id;
    try {
        const deletedBookmark = await bookmarkService.deleteBookmark(bookmarkId);
        res.json(deletedBookmark);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createBookmark,
    getAllBookmarks,
    getUserBookmarks,
    getPostBookmarks,
    deleteBookmark
};