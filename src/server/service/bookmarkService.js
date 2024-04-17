const Bookmark = require("../db/repository/bookmarkRepository");
const MagazinePost = require("../db/repository/magazinePostRepository");
const Post = require("../db/repository/postRepository");
const Recipe = require("../db/repository/recipeRepository");

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

// 특정 사용자의 북마크로부터 해당 북마크에 연결된 모든 게시물을 가져오는 함수

async function getAllPostsFromBookmarks(user_id) {
  try {
    const bookmarks = await getAllBookmarks(user_id); // 특정 사용자의 모든 북마크 가져오기
    const postIds = bookmarks.map((bookmark) => bookmark.post_id); // 북마크들의 post_id들 추출

    // 각 모델에서 데이터를 가져와서 하나의 배열에 추가
    const magazinePosts = await MagazinePost.find({ _id: { $in: postIds } });
    const posts = await Post.find({ _id: { $in: postIds } });
    const recipes = await Recipe.find({ _id: { $in: postIds } });

    // 가져온 데이터들을 하나의 배열로 합치기
    const allPosts = [...magazinePosts, ...posts, ...recipes];

    return allPosts;
  } catch (error) {
    // 에러 핸들링
    console.error("getAllPostsFromBookmarks 함수에서 에러 발생:", error);
    throw new Error(
      "북마크에 연결된 게시물을 가져오는 중에 오류가 발생했습니다."
    );
  }
}
module.exports = {
  createBookmark,
  getAllBookmarks,
  deleteBookmark,
  getAllPostsFromBookmarks,
};
