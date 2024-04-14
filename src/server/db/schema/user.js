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
    required: true,
  },
  social_login_provider: String,
  social_login_id: String,
  user_role: { type: String, default: "user" },
  password: {
    type: String,
    required: true,
  },
});

// 비밀번호 암호화
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
