// 유저
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  user_id : { 
    type: String, 
    required: true 
  },
  nickname: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    unique: true 
  },
  profile: String,
  social_login_provider: String,
  social_login_id: String,
  user_role: { type: String, default: 'user' }
});

// 비밀번호 암호화
userSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

module.exports = mongoose.model('User', userSchema);