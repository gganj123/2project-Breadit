const mongoose = require("mongoose");
const User = require("../db/repository/userRepository");
const UserService = require("../service/userService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../../config/config");
const axios = require("axios");
const model = require("../db/schema");
const transporter = require("../../config/transporter");
const redirectUri = process.env.VITE_REDIRECT_URI;

const {
  ACCESS_TOKEN_SECRET: accessTokenSecret,
  REFRESH_TOKEN_SECRET: refreshTokenSecret,
} = config;

// 회원가입 컨트롤러
async function signUp(req, res, next) {
  try {
    const { email, password, confirmPassword, nickname, profile, user_role } =
      req.body;

    // 비밀번호와 비밀번호 확인이 일치하는지 검사
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
      });
    }

    // 이메일 중복 검사
    const emailExists = await User.check_if_email_exists(email);
    if (emailExists) {
      return res.status(409).json({
        success: false,
        message: "이미 사용 중인 이메일입니다.",
      });
    }

    // 유저 생성
    const newUser = await User.create({
      email,
      password, // 비밀번호는 해싱 처리하는 것으로 가정
      nickname,
      profile,
      user_role, // user_role 추가
    });
    return res.status(201).json({
      success: true,
      message: "회원가입이 성공적으로 완료되었습니다.",
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
}

// 이메일 인증 코드 발송 함수
async function sendEmailVerification(req, res) {
  const { email } = req.body;

  // 이메일 중복 검사
  const emailExists = await User.check_if_email_exists(email);
  if (emailExists) {
    return res.status(409).json({
      success: false,
      message: "이미 가입된 회원입니다.",
    });
  }

  // 인증 코드 생성
  const verificationCode = Math.floor(100000 + Math.random() * 900000);
  const expirationTime = 3; // 유효 시간 (분)

  // 이메일 전송
  try {
    await transporter.sendMail({
      from: process.env.NAVER_USER,
      to: email,
      subject: "이메일 인증 코드",
      html: `<p>귀하의 인증 코드는 ${verificationCode}입니다. 이 코드는 ${expirationTime}분 동안 유효합니다.</p>`,
    });

    // 인증 코드와 유효 시간을 응답으로 보냄
    res.status(200).json({
      success: true,
      message: "인증 코드가 이메일로 전송되었습니다.",
      verificationCode, // 실제로는 코드를 클라이언트에게 보내지 않습니다. 예시를 위해 포함했습니다.
      expires_in: expirationTime,
    });
  } catch (error) {
    console.error("Email sending failed:", error);
    res.status(500).json({
      success: false,
      message: "이메일 전송에 실패했습니다.",
      error: error.message,
    });
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
      return res.status(401).json({ message: "유효하지 않은 토큰입니다." });
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
  const userId = req.params.userId; // URL 파라미터로부터 userId 추출
  const {
    currentPassword,
    newPassword,
    confirmNewPassword,
    nickname,
    profile,
  } = req.body;
  const requestingUserId = req.user.userId; // JWT에서 추출한 요청자 ID

  if (userId !== requestingUserId) {
    return res.status(403).json({
      success: false,
      message: "자신의 정보만 수정할 수 있습니다.",
    });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "사용자 정보를 찾을 수 없습니다." });
    }

    // 비밀번호 변경 요청 검사
    if (newPassword || confirmNewPassword || currentPassword) {
      if (!newPassword || !confirmNewPassword || !currentPassword) {
        return res.status(400).json({
          success: false,
          message: "모든 비밀번호 관련 필드를 제공해야 합니다.",
        });
      }

      if (newPassword !== confirmNewPassword) {
        return res.status(400).json({
          success: false,
          message: "새 비밀번호가 일치하지 않습니다.",
        });
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "현재 비밀번호가 정확하지 않습니다.",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedNewPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedNewPassword; // 비밀번호 업데이트
    }

    // 비밀번호 검증 성공 후 다른 정보 업데이트
    user.nickname = nickname || user.nickname;
    user.profile = profile || user.profile;

    await user.save(); // 모든 변경 사항 저장
    res.status(200).json({
      success: true,
      message: "회원 정보가 성공적으로 수정되었습니다.",
      user: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
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

// 비밀번호 검증 컨트롤러
async function verifyPassword(req, res, next) {
  const userId = req.params.userId;
  const { password } = req.body;
  const requestingUserId = req.user.userId;

  if (userId !== requestingUserId) {
    return res.status(403).json({
      success: false,
      message: "자신의 정보만 검증할 수 있습니다.",
    });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "사용자 정보를 찾을 수 없습니다." });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
    }

    res.status(200).json({
      success: true,
      message: "비밀번호 검증 성공",
    });
  } catch (error) {
    console.error("Error verifying password: ", error);
    res.status(500).json({ message: error.message });
  }
}

// 카카오 로그인
async function kakaoLogin(req, res) {
  try {
    const {
      id,
      kakao_account: {
        email,
        profile: { nickname },
      },
    } = req.body;
    let user = await User.findOne({
      social_login_id: id,
      social_login_provider: "Kakao",
    });

    if (!user) {
      user = await User.create({
        email,
        nickname,
        social_login_id: id,
        social_login_provider: "Kakao",
      });
    }

    // 토큰 생성 로직 등은 기존과 동일하게 처리
    res.status(200).json({
      /* 응답 데이터 */
    });
    console.log("카카오 로그인 성공");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// 로그아웃 컨트롤러
async function logout(req, res) {
  return res
    .status(200)
    .json({ message: "로그아웃 되었습니다. 클라이언트에서 토큰 삭제 필요." });
}

// !!!!!!!!!!!!!!카카오로그인!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
async function kakaosociallogin(req, res, next) {
  const { code } = req.body;
  console.log("받은 인가 코드:", code);
  console.log("전체 요청 본문:", req.body);

  if (!code) {
    console.error("인가 코드가 요청에 포함되어 있지 않습니다.");
    return res.status(400).json({
      success: false,
      message: "인가 코드가 필요합니다.",
    });
  }

  try {
    // 카카오 토큰 요청
    const tokenRequestUrl = "https://kauth.kakao.com/oauth/token";
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("client_id", "337cc9b1db3858ebe4a985229168765b"); // 카카오 REST API 키
    params.append("redirect_uri", redirectUri); // 리디렉션 URI
    params.append("code", code);

    const kakaoResponse = await axios.post(tokenRequestUrl, params.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const { access_token } = kakaoResponse.data;
    console.log("카카오 액세스 토큰:", access_token);

    // 카카오 사용자 정보 요청
    const userInfoResponse = await axios.get(
      "https://kapi.kakao.com/v2/user/me",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    const userInfo = userInfoResponse.data;
    console.log("카카오 사용자 정보:", userInfo);

    // 데이터베이스에서 사용자 조회 또는 생성
    let user = await model.user.findOne({
      social_login_id: userInfo.id,
      social_login_provider: "Kakao",
    });

    if (!user) {
      console.log("유저 등록 되어 있지 않음, 생성 시작");
      user = await model.user.create({
        email: userInfo.kakao_account.email,
        nickname: userInfo.kakao_account.profile.nickname,
        social_login_id: userInfo.id,
        social_login_provider: "Kakao",
        content_type: "Kakao",
      });
      console.log(`유저 없음 회원 등록 성공 ${user}`);
    }
    console.log(`유저 있음 ${user}`);
    // JWT 토큰 생성
    const accessToken = jwt.sign({ userId: user._id }, accessTokenSecret, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign({ userId: user._id }, refreshTokenSecret, {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      message: "로그인 성공",
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        email: user.email,
        nickname: user.nickname,
      },
    });
  } catch (error) {
    console.error("카카오 로그인 과정에서 오류 발생:", error);
    res.status(500).json({
      success: false,
      message: "로그인 실패",
      error: error.message,
    });
  }
}

// 토큰 갱신을 위한 컨트롤러
async function refreshToken(req, res) {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    console.error("Refresh Token not provided");
    return res.status(401).json({ message: "Refresh Token is required" });
  }

  try {
    // 리프레시 토큰을 검증합니다.
    const decoded = jwt.verify(refreshToken, refreshTokenSecret);
    if (!decoded) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const userId = decoded.userId; // 토큰에서 사용자 ID 추출

    // 새 액세스 토큰 발급
    const accessToken = jwt.sign({ userId: userId }, accessTokenSecret, {
      expiresIn: "15m", // 액세스 토큰 만료 시간
    });

    // 갱신된 액세스 토큰과 사용자 ID를 응답으로 보냅니다.
    res.json({
      accessToken,
      userId,
    });
  } catch (error) {
    console.error(`Token validation failed: ${error.message}`);
    return res.status(403).json({ message: "Invalid token" });
  }
}

module.exports = {
  signUp,
  sendEmailVerification,
  login,
  logout,
  updateUserInfo,
  deleteUser,
  getAllUsers,
  getUserById,
  verifyPassword,
  kakaoLogin,
  refreshToken,
  kakaosociallogin,
};
