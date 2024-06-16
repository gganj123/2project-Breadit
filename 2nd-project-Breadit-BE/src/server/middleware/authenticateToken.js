const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "토큰이 제공되지 않았습니다." });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "토큰이 형식에 맞지 않습니다." });
  }

  // .env 파일에 저장된 비밀 키 사용
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      let status = 403;
      let message = err.message || "인증 오류입니다.";

      if (err.name === "TokenExpiredError") {
        status = 401;
        message = "토큰이 만료되었습니다.";
      } else {
        // 사용자 정보를 req.user에 할당
        req.user = { userId: user.userId };
        next();
      }

      return res.status(status).json({ message: message });
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
