const User = require("../db/repository/userRepository");
const UserService = require("../service/userService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
    const requestingUserId = req.user.userId; // 토큰에서 추출된 사용자 ID

    // URL의 userId와 토큰에서 추출된 userId가 일치하는지 확인
    if (userId !== requestingUserId) {
      console.log(
        `Requested userId: ${userId}, Authorized userId: ${requestingUserId}`
      );
      return res.status(403).json({
        message: "접근 권한이 없습니다. 자신의 정보만 조회할 수 있습니다.",
      });
    }

    const user = await UserService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "사용자 정보가 없습니다." });
    }

    res.json(user); // 사용자 정보를 반환
  } catch (error) {
    console.log(`Error retrieving user: ${error.message}`);
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
    const updatedUser = await User.findByIdAndUpdate(userId, newUserData, {
      new: true,
    });

    if (!updatedUser) {
      throw new Error("회원 정보가 존재하지 않습니다.");
    }
    // 회원 정보 수정 성공 시 응답
    res.status(200).json({
      success: true,
      message: "회원 정보가 성공적으로 수정되었습니다.",
      user: updatedUser,
    });
  } catch (error) {
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
    const user = await User.findByEmail(email); // 이메일로 유저 찾기

    if (!user) {
      return res.status(404).json({ message: "찾을 수 없는 회원입니다." });
    }

    // 비밀번호 검증
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "유효하지 않은 접근입니다." });
    }

    // Access Token 생성
    const accessToken = jwt.sign(
      { userId: user._id },
      "YOUR_ACCESS_TOKEN_SECRET",
      { expiresIn: "15m" }
    );

    // Refresh Token 생성 및 HttpOnly 쿠키에 저장
    const refreshToken = jwt.sign(
      { userId: user._id },
      "YOUR_REFRESH_TOKEN_SECRET",
      { expiresIn: "7d" }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true, // HTTPS를 사용하는 경우 true로 설정
      sameSite: "strict",
    });

    res.json({ message: "로그인 되었습니다!", accessToken });
  } catch (error) {
    next(error);
  }
}

// 로그아웃 컨트롤러
async function logout(req, res) {
  res.clearCookie("refreshToken"); // refreshToken 쿠키 제거
  return res.status(200).json({ message: "로그아웃 되었습니다!" });
}

module.exports = {
  signUp,
  login,
  logout,
  updateUserInfo,
  deleteUser,
  getAllUsers,
  getUserById,
};
