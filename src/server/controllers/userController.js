const mongoose = require("mongoose");
const User = require("../db/repository/userRepository");
const UserService = require("../service/userService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../../config/config");
const { accessTokenSecret, refreshTokenSecret } = config;

/// 회원가입 컨트롤러
async function signUp(req, res, next) {
  try {
    const userData = req.body;

    // 이메일 중복 검사
    const emailExists = await User.check_if_email_exists(userData.email);
    if (emailExists) {
      return res.status(409).json({
        success: false,
        message: "이미 사용 중인 이메일입니다.",
      });
    }

    // 유저 생성
    const newUser = await User.create(userData);
    return res.status(201).json({
      success: true,
      message: "회원가입이 성공적으로 완료되었습니다.",
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
}

// 회원 정보 조회 컨트롤러
async function getUserById(req, res, next) {
  try {
    const userId = req.params.userId;
    console.log(`지정 유저 아이디: ${userId}, 타입: ${typeof userId}`);

    // 토큰에서 사용자 ID를 디코딩합니다.
    const token = req.headers.authorization?.split(" ")[1]; // Bearer 토큰을 가정합니다.
    if (!token) {
      return res.status(401).json({ message: "토큰이 제공되지 않았습니다." });
    }

    const decoded = jwt.verify(token, accessTokenSecret);
    const requestingUserId = decoded.userId; // 디코딩된 사용자 ID
    console.log(
      `요청된 유저 아이디: ${requestingUserId}, 타입: ${typeof requestingUserId}`
    );

    // 여기에서는 디코딩된 사용자 ID와 요청의 사용자 ID를 비교합니다.
    if (requestingUserId !== userId) {
      return res.status(403).json({
        message: "접근 권한이 없습니다. 자신의 정보만 조회할 수 있습니다.",
      });
    }

    const user = await UserService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "사용자 정보가 없습니다." });
    }

    res.json(user);
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "유효하지 않은 토큰입니다." });
    }
    console.log(`Error retrieving user: ${error.message}`);
    next(error);
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
    const userId = req.params.userId; // URL 파라미터로부터 userId 추출
    const newUserData = req.body;
    const requestingUserId = req.user.userId; // JWT 토큰에서 추출한 userId

    // 유저 정보 업데이트 서비스 호출
    const updatedUser = await UserService.updateUserInfo(
      userId,
      newUserData,
      requestingUserId
    );
    res.status(200).json({
      success: true,
      message: "회원 정보가 성공적으로 수정되었습니다.",
      user: updatedUser,
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

// 회원 탈퇴 컨트롤러
async function deleteUser(req, res, next) {
  try {
    // 클라이언트로부터 받은 유저 ID (URL에서의 파라미터)
    const userId = req.params.userId;

    // 인증된 유저의 ID (토큰에서 추출한 ID)
    const authenticatedUserId = req.user.userId;

    // 사용자가 자신의 계정만 삭제할 수 있는지 검사
    if (userId !== authenticatedUserId) {
      return res.status(403).json({
        success: false,
        message: "자신의 계정만 삭제할 수 있습니다.",
      });
    }

    // 권한 검증 후 회원 탈퇴 처리
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "회원 정보를 찾을 수 없습니다.",
      });
    }

    // 회원 탈퇴 성공 시 응답
    res.status(200).json({
      success: true,
      message: "회원 탈퇴가 성공적으로 완료되었습니다.",
      user: deletedUser,
    });
  } catch (error) {
    next(error);
  }
}

// 로그인 컨트롤러
async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "찾을 수 없는 회원입니다." });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "유효하지 않은 접근입니다." });
    }

    // ACCESS_TOKEN_SECRET과 REFRESH_TOKEN_SECRET 환경 변수 사용
    const accessToken = jwt.sign({ userId: user._id }, accessTokenSecret, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign({ userId: user._id }, refreshTokenSecret, {
      expiresIn: "7d",
    });
    const decodedAccessToken = jwt.verify(accessToken, accessTokenSecret);

    return res.status(200).json({
      message: "로그인 되었습니다!",
      accessToken,
      refreshToken,
      decodedAccessToken,
    });
  } catch (error) {
    return next(error);
  }
}

// 로그아웃 컨트롤러
async function logout(req, res) {
  return res
    .status(200)
    .json({ message: "로그아웃 되었습니다. 클라이언트에서 토큰 삭제 필요." });
}

// 토큰 갱신 컨트롤러
async function refreshToken(req, res) {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res
      .status(401)
      .json({ message: "Refresh Token이 제공되지 않았습니다." });
  }
  console.log(accessTokenSecret);

  // REFRESH_TOKEN_SECRET 환경 변수 사용
  jwt.verify(refreshToken, refreshTokenSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "유효하지 않은 토큰입니다." });
    }

    // ACCESS_TOKEN_SECRET 환경 변수 사용
    const accessToken = jwt.sign(
      { userId: user._id.toString() },
      accessTokenSecret,
      {
        expiresIn: "15m",
      }
    );

    res.json({ accessToken });
  });
}

module.exports = {
  signUp,
  login,
  logout,
  updateUserInfo,
  deleteUser,
  getAllUsers,
  getUserById,
  refreshToken,
};
