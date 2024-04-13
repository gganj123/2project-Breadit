const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const model = require("../schema");

// 회원 정보 조회 메서드
async function getUserById(userId) {
  try {
    const userInfo = await model.user.findById(userId);
    return userInfo;
  } catch (error) {
    throw new Error("회원 정보 조회 중 오류가 발생했습니다.");
  }
}

// 비밀번호 확인 메서드
async function check_password(candidate_password) {
  try {
    return await bcrypt.compare(candidate_password, this.password);
  } catch (error) {
    throw new Error("비밀번호 확인 중 오류가 발생했습니다.");
  }
}

// 이메일로 사용자 찾기 메서드 추가
async function findByEmail(email) {
  return await model.user.findOne({ email });
}

// 이메일 중복 확인 메서드
async function check_if_email_exists(email) {
  const user = await model.user.findOne({ email });
  return !!user; // 이메일이 존재하면 true, 아니면 false 반환
}

// 회원 전체 조회 메서드
async function find() {
  try {
    // 모든 사용자 조회
    const users = await model.user.find();
    return users;
  } catch (error) {
    console.error("사용자 전체 조회 중 오류:", error);
    throw new Error("사용자 전체 조회 중 오류가 발생했습니다.");
  }
}

// 회원가입 함수
async function create(userData) {
  try {
    const newUser = await model.user.create(userData);
    return newUser;
  } catch (error) {
    console.error("회원가입 중 오류:", error);
    throw new Error("회원가입 중 오류가 발생했습니다.");
  }
}

// 회원 정보 수정 메서드
async function findByIdAndUpdate(userId, newUserData, requestingUserId) {
  try {
    if (userId !== requestingUserId) {
      throw new Error("권한이 없습니다. 자신의 정보만 수정할 수 있습니다.");
    }

    const updatedUser = await model.user.findByIdAndUpdate(
      userId,
      newUserData,
      {
        new: true,
      }
    );
    if (!updatedUser) {
      throw new Error("해당 사용자를 찾을 수 없습니다.");
    }
    return updatedUser;
  } catch (error) {
    throw new Error("회원 정보 수정 중 오류가 발생했습니다.");
  }
}

// 회원 정보 수정 메서드
async function update_user(user_id, new_data) {
  const updated_user = await model.user.findByIdAndUpdate(user_id, new_data, {
    new: true,
  });
  return updated_user;
}

// 회원 탈퇴 메서드
async function findByIdAndDelete(userId) {
  const deletedUser = await model.user.findByIdAndDelete(userId);
  return deletedUser;
}

//회원 정보 조회 메서드
async function findById(userId) {
  try {
    const user = await model.user.findById(userId);
    if (!user) {
      // 특정 사용자를 찾을 수 없는 경우
      let error = new Error("해당 사용자를 찾을 수 없습니다.");
      error.status = 404; // Not Found
      throw error;
    }
    return user;
  } catch (error) {
    console.error("사용자 정보 조회 중 오류:", error);
    error.status = 500; // Internal Server Error
    throw error;
  }
}
// userId로 유저 조회 및 필요한 데이터 반환하는 함수
async function getUserProfileAndNickname(userId) {
  try {
    const user = await user
      .findOne({ user_id: userId })
      .select("profile nickname");
    if (!user) {
      throw new Error("해당 유저를 찾을 수 없습니다.");
    }
    return user;
  } catch (error) {
    throw new Error("유저 조회 중 오류가 발생했습니다.");
  }
}

module.exports = {
  check_password,
  check_if_email_exists,
  findByEmail,
  // join,
  update_user,
  // delete_user,
  getUserProfileAndNickname,
  find,
  create,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
  getUserById,
};
