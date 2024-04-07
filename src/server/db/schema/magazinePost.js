const mongoose = require('mongoose');

const magazinePostSchema = new mongoose.Schema(
  {
    post_id: mongoose.Schema.Types.ObjectId,
    user_id: {
       type: String,
       required: true 
      },
    nickname: { 
      type: String, 
      required: true 
    }, 
    profile: String,
    title: { 
      type: String, 
      required: true 
    },
    content: { 
      type: String, 
      required: true 
    },
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
  }
);

module.exports = magazinePostSchema;