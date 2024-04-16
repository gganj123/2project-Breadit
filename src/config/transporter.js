const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Naver",
  host: "smtp.naver.com", // SMTP 서버명
  port: 587, // SMTP 포트
  secure: false,
  auth: {
    user: process.env.NAVER_USER, // 네이버 아이디
    pass: process.env.NAVER_PASS, // 발급하여 저장한 비밀 번호
  },
});

module.exports = transporter;
