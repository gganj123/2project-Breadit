const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticateToken');

// 회원 정보 조회, 수정, 삭제에 대해 인증 미들웨어 적용
router.get('/:userId', authenticateToken, userController.getUserById);
router.put('/:userId', authenticateToken, userController.updateUserInfo);
router.delete('/:userId', authenticateToken, userController.deleteUser);

// POST 요청: 로그인
router.post('/login', userController.login);
router.post('/login/kakao', userController.kakaoLogin);
router.post('/login/kakaosociallogin', userController.kakaosociallogin);

// 로그아웃 라우트
router.post('/logout', userController.logout);

// POST 요청: 회원가입
router.post('/', userController.signUp);

router.post('/refreshToken', userController.refreshToken);

// PUT 요청: 회원 정보 수정
router.put('/:userId', userController.updateUserInfo);

// DELETE 요청: 회원 탈퇴
router.delete('/:userId', userController.deleteUser);

// 회원 정보 전체 조회 라우터
router.get('/', userController.getAllUsers);

// 특정 회원 정보 조회 라우터
router.get('/:userId', authenticateToken, userController.getUserById);

module.exports = router;
