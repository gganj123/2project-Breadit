const bookmarkService = require("../service/bookmarkService");

// 북마크 생성 컨트롤러
async function createBookmark(req, res, next) {
  try {
    const bookmarkData = req.body;
    const newBookmark = await bookmarkService.createBookmark(bookmarkData);
    res.status(201).json(newBookmark);
  } catch (error) {
    next(error); // 에러 핸들러로 예외를 전달합니다.
  }
}

// 모든 북마크 조회 컨트롤러
async function getAllBookmarks(req, res, next) {
  try {
    const { user_id, post_id } = req.query;
    const bookmarks = await bookmarkService.getAllBookmarks(user_id, post_id);
    res.status(200).json(bookmarks);
  } catch (error) {
    next(error); // 에러 핸들러로 예외를 전달합니다.
  }
}

// 북마크 삭제 컨트롤러
async function deleteBookmark(req, res, next) {
  try {
    const bookmarkId = req.params.id;
    const deletedBookmark = await bookmarkService.deleteBookmark(bookmarkId);
    res.json(deletedBookmark);
  } catch (error) {
    next(error); // 에러 핸들러로 예외를 전달합니다.
  }
}

module.exports = {
  createBookmark,
  getAllBookmarks,
  deleteBookmark,
};
