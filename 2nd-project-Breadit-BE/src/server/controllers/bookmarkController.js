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

// 특정 사용자의 북마크에 연결된 모든 magazinePost를 가져오는 컨트롤러
async function getAllPostsFromBookmarksController(req, res) {
  const { user_id } = req.params; // URL 경로에서 user_id를 가져옵니다.
  const { limit } = req.query;

  try {
    // getAllPostsFromBookmarks 함수를 호출하여 결과를 받아옵니다.
    const posts = await bookmarkService.getAllPostsFromBookmarks(
      user_id,
      limit ? parseInt(limit) : null
    );
    res.json(posts); // 결과를 JSON 형태로 클라이언트에 반환합니다.
  } catch (error) {
    // 에러가 발생한 경우 클라이언트에 에러 메시지를 반환합니다.
    res.status(500).json({ error: error.message });
  }
}
module.exports = {
  createBookmark,
  getAllBookmarks,
  deleteBookmark,
  getAllPostsFromBookmarksController,
};
