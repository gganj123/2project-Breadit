const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const model = require("../schema");

// 비밀번호 확인 메서드
async function check_password (candidate_password) {
  try {
    return await bcrypt.compare(candidate_password, this.password);
  } catch (error) {
    throw new Error('비밀번호 확인 중 오류가 발생했습니다.');
  }
};

// 이메일 중복 확인 메서드
async function check_if_email_exists(email) {
  const user = await model.user.findOne({ email });
  return !!user; // 이메일이 존재하면 true, 아니면 false 반환
}

// 회원가입 메서드
async function join(user_data) {
  const user = new model.user(user_data);
  await user.save();
  return user;
}

// 회원 정보 수정 메서드
async function update_user(user_id, new_data) {
  const updated_user = await model.user.findByIdAndUpdate(user_id, new_data, { new: true });
  return updated_user;
}

// 회원 탈퇴 메서드
async function delete_user(user_id) {
  const deleted_user = await model.user.findByIdAndDelete(user_id);
  return deleted_user;
}

// userId로 유저 조회 및 필요한 데이터 반환하는 함수
async function getUserProfileAndNickname(userId) {
    try {
      const user = await User.findOne({ user_id: userId }).select('profile nickname');
      if (!user) {
        throw new Error('해당 유저를 찾을 수 없습니다.');
      }
      return user;
    } catch (error) {
      throw new Error('유저 조회 중 오류가 발생했습니다.');
    }
  }

module.exports = {
  check_if_email_exists,
  join,
  update_user,
  delete_user,
  getUserProfileAndNickname,

};