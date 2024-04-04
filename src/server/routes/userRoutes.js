const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// POST 요청: 회원가입
router.post('/signup', userController.signUp);

// PUT 요청: 회원 정보 수정
router.put('/:userId', userController.updateUserInfo);

// DELETE 요청: 회원 탈퇴
router.delete('/:userId', userController.deleteUser);

module.exports = router;