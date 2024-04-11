const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("No token provided.");
    return res.status(401).json({ message: "토큰이 제공되지 않았습니다." });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    console.log("Token format is incorrect.");
    return res.status(401).json({ message: "토큰이 형식에 맞지 않습니다." });
  }

  // .env 파일에 저장된 비밀 키 사용
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(`JWT Verification Error: ${err.name} - ${err.message}`);
      let status = 403; // 기본값
      let message = err.message || "인증 오류입니다.";

      if (err.name === "TokenExpiredError") {
        status = 401; // 만료된 토큰은 401 Unauthorized를 사용할 수 있습니다.
        message = "토큰이 만료되었습니다.";
      } else if (err.name === "JsonWebTokenError") {
        message = "유효하지 않은 토큰입니다.";
      }

      return res.status(status).json({ message: message });
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
