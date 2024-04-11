const jwt = require("jsonwebtoken");

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

  jwt.verify(token, "YOUR_SECRET_KEY", (err, user) => {
    if (err) {
      console.log(`JWT Verification Error: ${err.name} - ${err.message}`);
      return res
        .status(403)
        .json({ message: err.message || "인증 오류입니다." });
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
