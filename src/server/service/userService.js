const UserModel = require("../db/repository/userRepository");

// 유저 서비스 - 회원가입
async function signUp(userData) {
  try {
    const newUser = await UserModel.create(userData);
    return newUser;
  } catch (error) {
    // error.status = 500;
    // error.message = "회원가입 중 오류가 발생했습니다.";
    throw error;
  }
}

// 회원 정보 전체 조회 서비스
async function getAllUsers() {
  try {
    const users = await UserModel.find(); // 사용자 모델에서 모든 사용자 조회
    return users;
  } catch (error) {
    console.log(error);
    error.status = 500;
    error.message = "전체 사용자 정보 조회중 오류가 발생했습니다.";
    throw error;
  }
}

// 유저 서비스 - 회원 정보 조회
async function getUserById(userId) {
  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new Error("해당 사용자를 찾을 수 없습니다.");
    }

    // userId와 requestingUserId가 모두 문자열이 아닌 ObjectId 타입일 수 있으므로, equals 메소드를 사용해 비교
    if (!user._id.equals(userId)) {
      throw new Error("권한이 없습니다. 자신의 정보만 조회할 수 있습니다.");
    }

    return user;
  } catch (error) {
    // error.status = 400;
    // error.message =
    //   "사용자 정보 조회중 오류가 발생했습니다. (에러핸들러 처리 확인중)";
    throw error;
  }
}

// 유저 서비스 - 회원 정보 수정
async function updateUserInfo(userId, newUserData) {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, newUserData, {
      new: true,
    });
    if (!updatedUser) {
      throw new Error("해당 사용자를 찾을 수 없습니다.");
    }
    return updatedUser;
  } catch (error) {
    // throw new Error('회원 정보 수정 중 오류가 발생했습니다.');
    error.status = 500;
    error.message = "회원 정보 수정 중 오류가 발생했습니다.";
    throw error;
  }
}

// 유저 서비스 - 회원 탈퇴
async function deleteUser(userId) {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new Error("해당 사용자를 찾을 수 없습니다.");
    }
    return deletedUser;
  } catch (error) {
    // throw new Error('회원 탈퇴 중 오류가 발생했습니다.');
    error.status = 500;
    error.message = "회원 탈퇴중 오류가 발생했습니다.";
    throw error;
  }
}

module.exports = {
  signUp,
  getUserById,
  updateUserInfo,
  deleteUser,
  getAllUsers,
};
