const UserModel = require("../db/repository/userRepository");
const nodemailer = require("nodemailer");
const emailService = require("./emailService");
const transporter = require("../../config/transporter");

// 유저 서비스 - 회원가입
async function signUp(userData) {
  try {
    const newUser = await UserModel.create(userData);
    // 인증 코드 생성 및 이메일 전송
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    await emailService.sendVerificationEmail(newUser.email, verificationCode);
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
    throw error;
  }
}

// 유저 서비스 - 회원 정보 수정
async function updateUserInfo(userId, newUserData, requestingUserId) {
  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      const error = new Error("해당 사용자를 찾을 수 없습니다.");
      error.status = 404;
      throw error;
    }

    if (user._id.toString() !== requestingUserId.toString()) {
      const error = new Error(
        "권한이 없습니다. 자신의 정보만 수정할 수 있습니다."
      );
      error.status = 403;
      throw error;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(userId, newUserData, {
      new: true,
    });

    if (!updatedUser) {
      const error = new Error("업데이트를 완료할 수 없습니다.");
      error.status = 404;
      throw error;
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

// 이메일 인증번호 전송
async function sendVerificationEmail(email, code) {
  const mailOptions = {
    from: process.env.NAVER_USER,
    to: email,
    subject: "이메일 인증",
    html: `<p>인증 코드: ${code}</p>`,
  };
  return transporter.sendMail(mailOptions);
}

module.exports = {
  signUp,
  getUserById,
  updateUserInfo,
  deleteUser,
  getAllUsers,
  sendVerificationEmail,
};
