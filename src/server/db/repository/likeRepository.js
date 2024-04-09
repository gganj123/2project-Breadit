const mongoose = require("mongoose");
const likeSchema = require("../schema/like");

// 모델 생성
const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
