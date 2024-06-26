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
  const user = await model.user
    .findOne({ email })
    .select("email social_login_provider");
  return user || false; // 이메일이 존재하면 user 객체를, 아니면 false를 반환
}

// 회원 전체 조회 메서드
async function find() {
  try {
    // 모든 사용자 조회
    const users = await model.user.find();
    return users;
  } catch (error) {
    throw new Error("사용자 전체 조회 중 오류가 발생했습니다.");
  }
}

// 회원가입 함수
async function create(userData) {
  try {
    const newUser = await model.user.create(userData);
    return newUser;
  } catch (error) {
    throw new Error("회원가입 중 오류가 발생했습니다.");
  }
}

// 회원 정보 수정 메서드
async function findByIdAndUpdate(userId, newUserData, options = {}) {
  try {
    return await model.user.findByIdAndUpdate(userId, newUserData, {
      ...options,
      new: true,
    });
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

// 회원 정보 조회 메서드
async function findById(userId) {
  try {
    const user = await model.user.findById(userId);
    if (!user) {
      // 특정 사용자를 찾을 수 없는 경우
      let error = new Error("해당 사용자를 찾을 수 없습니다.");
      error.status = 404;
      throw error;
    }
    return user;
  } catch (error) {
    error.status = 500;
    throw error;
  }
}

// userId로 유저 조회 및 필요한 데이터 반환하는 함수
async function getUserProfileAndNickname(userId) {
  try {
    const user = await model.user
      .findOne({ _id: userId })
      .select("profile nickname");
    if (!user) {
      throw new Error("해당 유저를 찾을 수 없습니다.");
    }
    return user;
  } catch (error) {
    throw new Error("유저 조회 중 오류가 발생했습니다.");
  }
}

// 카카오 소셜 로그인을 위한 사용자 조회 또는 생성 메서드
async function findOrCreateKakaoUser(kakaoData) {
  const { id, kakao_account } = kakaoData;
  const email = kakao_account?.email;
  const nickname = kakao_account?.profile?.nickname || "Default Nickname";

  if (!email) {
    throw new Error(
      "카카오 계정에서 이메일 정보를 찾을 수 없습니다. 이메일 제공에 동의해주세요."
    );
  }

  const user = await model.user.findOne({
    social_login_id: id,
    social_login_provider: "Kakao",
  });

  if (user) {
    return user;
  } else {
    if (!email) {
      throw new Error("카카오 계정에 이메일 정보가 없습니다.");
    }

    const newUser = await model.user.create({
      email,
      nickname: nickname || "Default Nickname",
      social_login_provider: "Kakao",
      social_login_id: id,
      user_role: "user",
    });
    return newUser;
  }
}

module.exports = {
  getUserById,
  check_password,
  check_if_email_exists,
  findByEmail,
  update_user,
  getUserProfileAndNickname,
  findOrCreateKakaoUser,
  find,
  create,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
};
