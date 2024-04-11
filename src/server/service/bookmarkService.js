const Bookmark = require("../db/repository/bookmarkRepository");

// 북마크 생성 함수
async function createBookmark(bookmarkData) {
  const newBookmark = await Bookmark.create(bookmarkData);
  if (!newBookmark) {
    const error = new Error("북마크를 생성하는 중 오류가 발생했습니다.");
    error.status = 500;
    throw error;
  }
  return newBookmark;
}

// 모든 북마크 조회 함수
async function getAllBookmarks(user_id, post_id) {
  let filter = {};
  if (user_id) {
    filter.user_id = user_id;
  }
  if (post_id) {
    filter.post_id = post_id;
  }
  const bookmarks = await Bookmark.find(filter);
  if (!bookmarks) {
    const error = new Error("모든 북마크를 조회하는 중 오류가 발생했습니다.");
    error.status = 404;
    throw error;
  }
  return bookmarks;
}

// 북마크 삭제 함수
async function deleteBookmark(bookmarkId) {
  const deletedBookmark = await Bookmark.findByIdAndDelete(bookmarkId);
  if (!deletedBookmark) {
    const error = new Error("해당 ID에 해당하는 북마크를 찾을 수 없습니다.");
    error.status = 404;
    throw error;
  }
  return deletedBookmark;
}

module.exports = {
  createBookmark,
  getAllBookmarks,
  deleteBookmark,
};
