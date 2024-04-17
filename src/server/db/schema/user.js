const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profile: {
    type: String,
    required: false, // 프로필 이미지는 필수가 아님
  },
  user_role: {
    type: String,
    default: "",
  },
  social_login_provider: {
    type: String,
    required: false,
  },
  social_login_id: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: function () {
      return !this.social_login_id;
    }, // 소셜 로그인 사용자는 비밀번호 필요 없음
  },
  confirmPassword: {
    type: String,
    required: false,
  },
});

// 비밀번호 암호화
userSchema.pre("save", async function (next) {
  console.log("패스워드 변경됐나요?", this.isModified("password"));
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
