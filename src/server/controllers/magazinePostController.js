const magazineService = require('../service/magazinePostService');

// 매거진 포스트 생성 컨트롤러
async function createMagazinePost(req, res) {
    try {
        const postData = req.body;
        const newPost = await magazineService.createMagazinePost(postData);
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// 모든 매거진 포스트 가져오기 컨트롤러
async function getAllMagazinePosts(req, res) {
    try {
        const posts = await magazineService.getAllMagazinePosts();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// 특정 매거진 포스트 가져오기 컨트롤러
async function getMagazinePostById(req, res) {
    try {
        const postId = req.params.id;
        const post = await magazineService.getMagazinePostById(postId);
        if (!post) {
            res.status(404).json({ message: '매거진 포스트를 찾을 수 없습니다.' });
            return;
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// 매거진 포스트 업데이트 컨트롤러
async function updateMagazinePost(req, res) {
    try {
        const postId = req.params.id;
        const newData = req.body;
        const updatedPost = await magazineService.updateMagazinePost(postId, newData);
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// 매거진 포스트 삭제 컨트롤러
async function deleteMagazinePost(req, res) {
    try {
        const postId = req.params.id;
        const deletedPost = await magazineService.deleteMagazinePost(postId);
        res.json(deletedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// MagazinePost 모델의 댓글 필터링 컨트롤러
async function getCommentsForMagazinePost(req, res) {
    try {
        const postId = req.params.id;
        const comments = await magazineService.getCommentsForMagazinePost(postId);
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createMagazinePost,
    getAllMagazinePosts,
    getMagazinePostById,
    updateMagazinePost,
    deleteMagazinePost,
    getCommentsForMagazinePost
};