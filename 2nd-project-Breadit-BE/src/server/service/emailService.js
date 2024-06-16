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
module.exports = { sendVerificationEmail };
