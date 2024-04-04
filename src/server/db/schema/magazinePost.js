const mongoose = require('mongoose');

const magazinePostSchema = new mongoose.Schema(
  {
    post_id: mongoose.Schema.Types.ObjectId,
    user_id: String,
    title: String,
    content: String,
    images: { 
      type: [String],
      validate: {
        validator: val => val.length <= 5,
        message: '{PATH} exceeds the limit of 5'
      }
    }, // 첨부된 이미지 ( 최대 5개 )
    bread_id: String, // 지도 API 정보
    instagram_info: String, // 인스타 API 정보
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = magazinePostSchema;