const commentService = require('../service/commentService');

// 댓글 생성 컨트롤러
async function createComment(req, res, next) {
    try {
        const commentData = req.body;
        const newComment = await commentService.createComment(commentData);
        res.status(201).json(newComment);
    } catch (error) {
        // res.status(500).json({ message: error.message });
        next(error);
    }
}

// 모든 댓글 가져오기 컨트롤러
async function getAllComments(req, res, next) {
    try {
        const comments = await commentService.getAllComments();
        res.json(comments);
    } catch (error) {
        // res.status(500).json({ message: error.message });
        next(error);
    }
}

// 특정 댓글 가져오기 컨트롤러
async function getCommentById(req, res, next) {
    try {
        const commentId = req.params.id;
        const comment = await commentService.getCommentById(commentId);
        if (!comment) {
            res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
            return;
        }
        res.json(comment);
    } catch (error) {
        // res.status(500).json({ message: error.message });
        next(error);
    }
}

// 특정 사용자의 댓글 가져오기 컨트롤러
async function getCommentsByUserId(req, res, next) {
    try {
        const userId = req.params.userId;
        const comments = await commentService.getCommentsByUserId(userId);
        res.json(comments);
    } catch (error) {
        // res.status(500).json({ message: error.message });
        next(error);
    }
}

// 특정 포스트 댓글 가져오기 컨트롤러
async function getCommentsByPostId(req, res, next) {
    try {
        const postId = req.params.postId;
        const comments = await commentService.getCommentsByPostId(postId);
        res.json(comments);
    } catch (error) {
        // 오류가 발생하면 next(error)를 호출하여 미들웨어 체인 상의 다음 오류 처리 미들웨어로 전달합니다.
        next(error);
    }
}

// 댓글 업데이트 컨트롤러
async function updateComment(req, res, next) {
    try {
        const commentId = req.params.id;
        const newData = req.body;
        const updatedComment = await commentService.updateComment(commentId, newData);
        res.json(updatedComment);
    } catch (error) {
        // res.status(500).json({ message: error.message });
        next(error);
    }
}

// 댓글 삭제 컨트롤러
async function deleteComment(req, res, next) {
    try {
        const commentId = req.params.id;
        const deletedComment = await commentService.deleteComment(commentId);
        res.json(deletedComment);
    } catch (error) {
        // res.status(500).json({ message: error.message });
        next(error);
    }
}

module.exports = {
    createComment,
    getAllComments,
    getCommentById,
    getCommentsByUserId,
    updateComment,
    deleteComment,
    getCommentsByPostId
};