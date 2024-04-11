const UserModel = require("../db/repository/userRepository");

// 유저 서비스 - 회원가입
async function signUp(userData) {
  try {
    const newUser = await UserModel.create(userData);
    return newUser;
  } catch (error) {
    throw error;
  }
}

// 회원 정보 전체 조회 서비스
async function getAllUsers() {
  try {
    const users = await UserModel.find();
    return users;
  } catch (error) {
    console.error("Error retrieving all users:", error);
    throw new Error("전체 사용자 정보 조회중 오류가 발생했습니다.");
  }
}

// 유저 서비스 - 회원 정보 조회
async function getUserById(userId, requestingUserId) {
  try {
    if (userId !== requestingUserId) {
      throw new Error("권한이 없습니다. 자신의 정보만 조회할 수 있습니다.");
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error("해당 사용자를 찾을 수 없습니다.");
    }
    return user;
  } catch (error) {
    throw error;
  }
}

// 유저 서비스 - 회원 정보 수정
async function updateUserInfo(userId, newUserData, requestingUserId) {
  try {
    if (userId !== requestingUserId) {
      throw new Error("권한이 없습니다. 자신의 정보만 수정할 수 있습니다.");
    }

    const updatedUser = await UserModel.findByIdAndUpdate(userId, newUserData, {
      new: true,
    });
    if (!updatedUser) {
      throw new Error("해당 사용자를 찾을 수 없습니다.");
    }
    return updatedUser;
  } catch (error) {
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
