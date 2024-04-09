const BookmarkService = require("../service/bookmarkService");

// 모든 북마크를 가져오는 컨트롤러 함수
async function getAllBookmarks(req, res) {
  try {
    const bookmarks = await BookmarkService.getAllBookmarks();
    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// 특정 사용자의 모든 북마크를 가져오는 컨트롤러 함수
async function getUserBookmarks(req, res) {
  const userId = req.params.userId;
  try {
    const bookmarks = await BookmarkService.getUserBookmarks(userId);
    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// 특정 포스트의 모든 북마크를 가져오는 컨트롤러 함수
async function getPostBookmarks(req, res) {
  const postId = req.params.postId;
  try {
    const bookmarks = await BookmarkService.getPostBookmarks(postId);
    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// 새로운 북마크를 생성하는 컨트롤러 함수
async function createBookmark(req, res) {
  const { userId, postId } = req.body;
  try {
    const newBookmark = await BookmarkService.createBookmark(userId, postId);
    res.json(newBookmark);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// 특정 북마크를 삭제하는 컨트롤러 함수
async function deleteBookmark(req, res) {
  const bookmarkId = req.params.bookmarkId;
  try {
    const deletedBookmark = await BookmarkService.deleteBookmark(bookmarkId);
    res.json(deletedBookmark);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllBookmarks,
  getUserBookmarks,
  getPostBookmarks,
  createBookmark,
  deleteBookmark,
};
