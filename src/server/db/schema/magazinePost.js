
module.exports = MagazinePost;
const mongoose = require('mongoose');

const magazinePostSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true }, 
    content: { 
      type: String, 
      required: true 
    }, // 작성된 내용
    images: { 
      type: [String], 
      validate: [arrayLimit, '{PATH} exceeds the limit of 5'] 
    }, // 첨부된 이미지 (최대 5개)
    bread_id: { 
      type: String 
    }, // 지도 API 정보
    instagram_info: { 
      type: String 
    },
    comment_id:[{
      type:String
    }] // 인스타그램 API 정보
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
