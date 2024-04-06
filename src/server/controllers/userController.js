const User = require('../db/repository/userRepository');
const UserService = require('../service/userService')

// 회원가입 컨트롤러
async function signUp(req, res, next) {
  try {
    const userData = req.body;

    // 이메일 중복 검사 (가정)
    const emailExists = true; // 에러 시뮬레이션을 위해 항상 true로 설정
    if (emailExists) {
      return res.status(409).json({
        success: false,
        message: '이미 사용 중인 이메일입니다.'
      });
    }

    const newUser = await User.create(userData);
    return res.status(201).json({
      success: true,
      message: '회원가입이 성공적으로 완료되었습니다.',
      user: newUser
    });
  } catch (error) {
    // 오류 발생 시 여기서 처리
    // return res.status(400).json({
    //   success: false,
    //   message: '회원가입 중 오류가 발생했습니다.',
    //   error: error.message
    // });
    next(error)
  }
}

// 회원 정보 조회 컨트롤러
async function getUserById(req, res, next) {
  try {
    const userId = req.params.userId;
    // 존재하지 않는 사용자 ID에 대한 에러 시뮬레이션
    if (!userId || userId === 'nonexistent') {
      throw new Error('사용자를 찾을 수 없습니다.'); // 의도적 에러 발생
    }

    const user = await UserService.getUserById(userId);
    if (!user) {
      throw new Error('사용자 정보가 없습니다.');
    }

    res.json(user); // 사용자 정보를 반환
  } catch (error) {
    next(error); // 오류 처리 미들웨어로 전달
  }
}

// 회원 정보 전체 조회 컨트롤러
async function getAllUsers(req, res, next) {
  try {
    const users = await UserService.getAllUsers();
    res.json(users); // 모든 사용자 정보를 반환
  } catch (error) {
    next(error); // 오류 처리 미들웨어로 전달
  }
}

// 회원 정보 수정 컨트롤러
async function updateUserInfo(req, res, next) {
  try {
    // 클라이언트로부터 받은 수정할 회원 정보 데이터
    const { userId } = req.params;
    const newUserData = req.body;

    // 회원 정보 수정 함수 호출
    const updatedUser = await User.findByIdAndUpdate(userId, newUserData, { new: true });

    if (!updatedUser) {
      throw new Error('회원 정보가 존재하지 않습니다.');
    }
    // 회원 정보 수정 성공 시 응답
    res.status(200).json({
      success: true,
      message: '회원 정보가 성공적으로 수정되었습니다.',
      user: updatedUser
    });
  } catch (error) {
    // 회원 정보 수정 실패 시 에러 응답
    // res.status(400).json({
    //   success: false,
    //   message: '회원 정보 수정 중 오류가 발생했습니다.',
    //   error: error.message
    // });
    next(error);
  }
}

// 회원 탈퇴 컨트롤러
async function deleteUser(req, res, next) {
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
    // res.status(400).json({
    //   success: false,
    //   message: '회원 탈퇴 중 오류가 발생했습니다.',
    //   error: error.message
    // });
    next(error);
  }
}

module.exports = {
  signUp,
  updateUserInfo,
  deleteUser,
  getAllUsers,
  getUserById
};