const Post = require("../db/repository/postRepository"); // Post 모델을 가져옵니다.
const Like = require("../db/repository/likeRepository"); // Like 모델을 가져옵니다.
const Bookmark = require("../db/repository/bookmarkRepository");
const { ObjectId } = require("mongoose").Types;

// 포스트 생성 서비스
async function createPost(postData) {
  const newPost = await Post.create(postData);
  if (!newPost) {
    const error = new Error("포스트 생성 중 오류가 발생했습니다.");
    error.status = 500;
    throw error;
  }
  return newPost;
}

// 모든 포스트 가져오기 서비스
async function getAllPosts(searchQuery, limit) {
  // limit 매개변수 추가
  try {
    let query = {};

    if (searchQuery) {
      const regex = new RegExp(searchQuery, "i");

      query = {
        $or: [
          { title: { $regex: regex } },
          { content: { $regex: regex } },
          { nickname: { $regex: regex } },
        ],
      };
    }

    const posts = await Post.find(query).limit(limit); // limit 매개변수 사용
    if (!posts || posts.length === 0) {
      const error = new Error("포스트를 찾을 수 없습니다.");
      error.status = 404;
      throw error;
    }
    return posts;
  } catch (error) {
    throw error;
  }
}

// 특정 포스트 조회
async function getPostById(postId) {
  try {
    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error("postId에 해당하는 포스트를 찾을 수 없습니다.");
      error.status = 404;
      throw error;
    }

    const like = await Like.findOne({
      user_id: userId,
      post_id: postId,
    });

    const bookmark = await Bookmark.findOne({
      user_id: userId,
      post_id: postId,
    });

    const beLike = like ? true : false;
    const beBookmark = bookmark ? true : false;

    return { post, beLike, beBookmark };
  } catch (error) {
    throw error;
  }
}

// 포스트 업데이트 서비스
async function updatePost(postId, newData) {
  const updatedPost = await Post.findByIdAndUpdate(postId, newData, {
    new: true,
  });
  if (!updatedPost) {
    const error = new Error(
      "postId에 해당하는 포스트를 찾을 수 없어 업데이트할 수 없습니다."
    );
    error.status = 404;
    throw error;
  }
  return updatedPost;
}

// 포스트 삭제 서비스
async function deletePost(postId) {
  const deletedPost = await Post.findByIdAndDelete(postId);
  if (!deletedPost) {
    const error = new Error(
      "postId에 해당하는 추천 포스트를 찾을 수 없어 삭제할 수 없습니다."
    );
    error.status = 404;
    throw error;
  }
  return deletedPost;
}

// 포스트 선택 삭제 서비스
async function deletePosts(postIds) {
  try {
    const deletedPosts = await Post.deleteMany({
      _id: { $in: postIds },
    });

    if (deletedPosts.deletedCount === 0) {
      const error = new Error("삭제할 추천 포스트가 없습니다.");
      error.status = 404;
      throw error;
    }

    return deletedPosts;
  } catch (error) {
    throw error;
  }
}

// 게시물의 좋아요를 처리하는 함수

async function toggleLike(user_id, post_id) {
  try {
    const userId = new ObjectId(user_id);
    const postId = new ObjectId(post_id);

    const existingLike = await Like.findOne({
      user_id: userId,
      post_id: postId,
    });

    if (existingLike) {
      await Post.findByIdAndUpdate(postId, { $inc: { like_count: -1 } });
      await Like.findOneAndRemove({ user_id: userId, post_id: postId });
    } else {
      await Post.findByIdAndUpdate(postId, { $inc: { like_count: 1 } });
      await Like.create({ user_id: userId, post_id: postId });
    }

    const updatedPost = await Post.findById(postId);
    return updatedPost;
  } catch (error) {
    console.error("좋아요 토글 중 오류 발생:", error);
    throw error;
  }
}

// 포스트의 북마크 토글 함수
async function postToggleBookmark(user_id, post_id) {
  try {
    const userId = new ObjectId(user_id);
    const postId = new ObjectId(post_id);

    const existingBookmark = await Bookmark.findOne({
      user_id: userId,
      post_id: postId,
    });

    if (existingBookmark) {
      await Bookmark.findOneAndRemove({ user_id: userId, post_id: postId });
    } else {
      await Bookmark.create({ user_id: userId, post_id: postId });
    }

    const updatedPost = await Post.findById(postId);
    return updatedPost;
  } catch (error) {
    console.error("북마크 토글 중 오류 발생:", error);
    throw error;
  }
}

//게시물의 좋아요 상태 함수
async function getPostWithLikeStatus(post_id, user_id) {
  try {
    const postId = new ObjectId(post_id);
    const userId = new ObjectId(user_id);

    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("게시물을 찾을 수 없습니다.");
    }

    const like = await Like.findOne({
      user_id: userId,
      post_id: postId,
    });

    const isLikedByUser = like ? true : false;

    return {
      post: post,
      isLikedByUser: isLikedByUser,
    };
  } catch (error) {
    console.error("포스트 정보 조회 중 오류 발생:", error);
    throw error;
  }
}

// 포스트의 북마크 상태 함수
async function getPostWithBookmarkStatus(post_id, user_id) {
  try {
    const postId = new ObjectId(post_id);
    const userId = new ObjectId(user_id);

    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("포스트를 찾을 수 없습니다.");
    }

    const bookmark = await Bookmark.findOne({
      user_id: userId,
      post_id: postId,
    });

    const isBookmarkedByUser = bookmark ? true : false;

    return {
      post: post,
      isBookmarkedByUser: isBookmarkedByUser,
    };
  } catch (error) {
    console.error("포스트 정보 조회 중 오류 발생:", error);
    throw error;
  }
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  deletePosts,
  toggleLike,
  postToggleBookmark,
  getPostWithLikeStatus,
  getPostWithBookmarkStatus,
};
