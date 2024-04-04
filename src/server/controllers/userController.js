const User = require('../models/userModel');

// 회원가입 컨트롤러
async function signUp(req, res) {
  try {
    // 클라이언트로부터 받은 회원가입 데이터
    const userData = req.body;

    // 회원가입 함수 호출
    const newUser = await User.create(userData);

    // 회원가입 성공 시 응답
    res.status(201).json({
      success: true,
      message: '회원가입이 성공적으로 완료되었습니다.',
      user: newUser
    });
  } catch (error) {
    // 회원가입 실패 시 에러 응답
    res.status(400).json({
      success: false,
      message: '회원가입 중 오류가 발생했습니다.',
      error: error.message
    });
  }
}

// 회원 정보 수정 컨트롤러
async function updateUserInfo(req, res) {
  try {
    // 클라이언트로부터 받은 수정할 회원 정보 데이터
    const { userId } = req.params;
    const newUserData = req.body;

    // 회원 정보 수정 함수 호출
    const updatedUser = await User.findByIdAndUpdate(userId, newUserData, { new: true });

    // 회원 정보 수정 성공 시 응답
    res.status(200).json({
      success: true,
      message: '회원 정보가 성공적으로 수정되었습니다.',
      user: updatedUser
    });
  } catch (error) {
    // 회원 정보 수정 실패 시 에러 응답
    res.status(400).json({
      success: false,
      message: '회원 정보 수정 중 오류가 발생했습니다.',
      error: error.message
    });
  }
}

// 회원 탈퇴 컨트롤러
async function deleteUser(req, res) {
  try {
    // 클라이언트로부터 받은 유저 ID
    const { userId } = req.params;

    // 회원 탈퇴 함수 호출
    const deletedUser = await User.findByIdAndDelete(userId);

    // 회원 탈퇴 성공 시 응답
    res.status(200).json({
      success: true,
      message: '회원 탈퇴가 성공적으로 완료되었습니다.',
      user: deletedUser
    });
  } catch (error) {
    // 회원 탈퇴 실패 시 에러 응답
    res.status(400).json({
      success: false,
      message: '회원 탈퇴 중 오류가 발생했습니다.',
      error: error.message
    });
  }
}

module.exports = {
  signUp,
  updateUserInfo,
  deleteUser
};