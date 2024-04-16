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

    // 데이터베이스 조회 로직이 필요하다면, 여기서 해당 로직을 추가하면 됩니다.
    // 예를 들어, 이메일 중복 검사 등의 기능을 구현할 수 있습니다.

    const random_code = Math.floor(Math.random() * 1000000);
    transporter.sendMail({
      from: process.env.NAVER_USER,
      to: emailValue,
      subject: "[YourSubject] 인증코드 안내",
      html: `<html><body><div><p>인증 코드: ${random_code}</p></div></body></html>`,
    });

    console.log(random_code, "메일 인증번호");

    result.success = true;
    result.code = random_code;

    res.send(result);
  } catch (e) {
    result.message = e.message;
    console.log("POST /mail API ERR : ", e.message);
    res.status(400).json(result);
  }
});

module.exports = router;
