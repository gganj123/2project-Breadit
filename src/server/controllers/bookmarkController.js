const bookmarkService = require("../service/bookmarkService");

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
    const { user_id, post_id } = req.query;
    const bookmarks = await bookmarkService.getAllBookmarks(user_id, post_id);
    res.status(200).json(bookmarks);
  } catch (error) {
    next(error);
  }
}

// 북마크 삭제 컨트롤러
async function deleteBookmark(req, res) {
  try {
    const bookmarkId = req.params.id;
    const deletedBookmark = await bookmarkService.deleteBookmark(bookmarkId);
    res.json(deletedBookmark);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createBookmark,
  getAllBookmarks,
  deleteBookmark,
};
