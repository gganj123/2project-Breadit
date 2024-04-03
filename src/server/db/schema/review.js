const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({

    review_id: String,
    user_id : String,
    post_id: { type: mongoose.Schema.Types.ObjectId},
    rating: Number,
    created_at: { type: Date, default: Date.now },//타임스탬프로 작성하는것이 데이터 처리가 더 효과적인지 질문
    content: String,
    can_post: { 
        type: Boolean,
        default: true 
      }},
      // {
      //   timestamps: true,
      //   versionKey: false,
      // }//이것과 비교하기 created_at
    );


const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

