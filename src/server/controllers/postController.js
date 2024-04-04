const postService = require('../services/postService');

// 포스트 생성 컨트롤러
async function createPost(req, res) {
    try {
        const postData = req.body;
        const newPost = await postService.createPost(postData);
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// 모든 포스트 가져오기 컨트롤러
async function getAllPosts(req, res) {
    try {
        const posts = await postService.getAllPosts();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// 특정 포스트 가져오기 컨트롤러
async function getPostById(req, res) {
    try {
        const postId = req.params.id;
        const post = await postService.getPostById(postId);
        if (!post) {
            res.status(404).json({ message: '포스트를 찾을 수 없습니다.' });
            return;
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// 포스트 업데이트 컨트롤러
async function updatePost(req, res) {
    try {
        const postId = req.params.id;
        const newData = req.body;
        const updatedPost = await postService.updatePost(postId, newData);
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// 포스트 삭제 컨트롤러
async function deletePost(req, res) {
    try {
        const postId = req.params.id;
        const deletedPost = await postService.deletePost(postId);
        res.json(deletedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// 포스트의 댓글 필터링 컨트롤러
async function getCommentsForPost(req, res) {
    try {
        const postId = req.params.id;
        const comments = await postService.getCommentsForPost(postId);
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    getCommentsForPost
};