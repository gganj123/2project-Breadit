const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// POST 요청: 회원가입
router.post('/', userController.signUp);

// PUT 요청: 회원 정보 수정
router.put('/:userId', userController.updateUserInfo);

// DELETE 요청: 회원 탈퇴
router.delete('/:userId', userController.deleteUser);

// 회원 정보 전체 조회 라우터
router.get('/', userController.getAllUsers);

// 회원 정보 조회 라우터
router.get('/:userId', userController.getUserById);

module.exports = router;