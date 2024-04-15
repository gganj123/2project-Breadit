const mongoose = require("mongoose");
const User = require("../db/repository/userRepository");
const UserService = require("../service/userService");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const bcrypt = require("bcrypt");
const config = require("../../config/config");
const {
  ACCESS_TOKEN_SECRET: accessTokenSecret,
  REFRESH_TOKEN_SECRET: refreshTokenSecret,
} = config;

// 회원가입 컨트롤러
async function signUp(req, res, next) {
  try {
    const { email, password, confirmPassword, nickname, profile } = req.body;

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

// 카카오 로그인
// 카카오 로그인
async function kakaoLogin(req, res) {
  const { code } = req.body;
  try {
    const tokenRequestUrl = "https://kauth.kakao.com/oauth/token";
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("client_id", config.kakao.clientId);
    params.append("redirect_uri", config.kakao.redirectUri);
    params.append("code", code);

    const kakaoResponse = await axios.post(tokenRequestUrl, params.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const { access_token } = kakaoResponse.data;

    // 카카오 사용자 정보 요청
    const userInfoResponse = await axios.get(
      "https://kapi.kakao.com/v2/user/me",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          property_keys: JSON.stringify([
            "kakao_account.email",
            "properties.nickname",
          ]), // 이메일과 닉네임 정보 요청
        },
      }
    );

    const userInfo = userInfoResponse.data;
    console.log("Kakao user info:", userInfo); // 로깅 추가

    const email = userInfo.kakao_account.email;
    const nickname = userInfo.properties?.nickname || "Default Nickname";

    const user = await User.findOrCreateKakaoUser({
      id: userInfo.id,
      email: email,
      nickname: nickname,
    });

    const accessToken = jwt.sign({ userId: user._id }, accessTokenSecret, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign({ userId: user._id }, refreshTokenSecret, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      message: "카카오 로그인 성공",
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        email: user.email,
        nickname: user.nickname,
      },
    });
  } catch (error) {
    console.error("Error in Kakao login:", error);
    res.status(500).json({ error: error.message });
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
  kakaoLogin,
  refreshToken,
};
