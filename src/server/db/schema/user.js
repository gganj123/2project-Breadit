// 유저
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: String,
  social_login_provider: String,
  social_login_id: String,
  user_role: { type: String, default: "user" },
});
