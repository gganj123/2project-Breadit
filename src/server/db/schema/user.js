// 유저
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  userId: String,
  nickname: String,
  email: String,
  profile: String,
  socialLoginProvider: String,
  socialLoginId: String,
  userRole: { type: String, default: 'user' }
});
