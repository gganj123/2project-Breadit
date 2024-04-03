const mongoose = require('mongoose');

const magazinePostSchema = new mongoose.Schema(
  {
    post_id: String,
    user_id: String,
    title: String,
    content: String,
    images: { 
      type: [String],
      validate: {
        validator: arrayLimit,
        message: '{PATH} exceeds the limit of 5'
      }
    }, // 첨부된 이미지 ( 최대 5개 )
    bread_id: { 
      type: String 
    }, // 지도 API 정보
    instagram_info: { 
      type: String 
    }, // 인스타 API 정보
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

function arrayLimit(val) {
  return val.length <= 5;
}

const MagazinePost = mongoose.model('MagazinePost', magazinePostSchema);

module.exports = MagazinePost;