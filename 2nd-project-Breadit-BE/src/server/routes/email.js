const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const transporter = require("../../config/transporter");

router.post("/", async (req, res) => {
  const emailValue = req.body.email;
  const result = {
    success: false,
    message: null,
    code: null,
  };

  const emailRule =
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  try {
    if (!emailRule.test(emailValue)) {
      throw new Error("이메일 양식이 올바르지 않습니다.");
    } else if (
      emailValue === null ||
      emailValue === undefined ||
      emailValue === "" ||
      emailValue === "@"
    ) {
      throw new Error("이메일 값이 올바르지 않습니다.");
    }

    const random_code = Math.floor(Math.random() * 1000000);
    transporter.sendMail({
      from: process.env.NAVER_USER,
      to: emailValue,
      subject: "[브레딧 가입] 인증코드 안내",
      html: `<html><body><div><p>인증 코드: ${random_code}</p></div></body></html>`,
    });

    // await transporter.sendMail({
    //   from: process.env.NAVER_USER,
    //   to: "example@gmail.com", // 테스트 수신자 변경 가능
    //   subject: "Test Email from Naver",
    //   text: "This is a test email sent from Naver SMTP using Nodemailer.",
    // });

    result.success = true;
    result.code = random_code;

    res.send(result);
  } catch (e) {
    result.message = e.message;
    res.status(400).json(result);
  }
});

module.exports = router;
