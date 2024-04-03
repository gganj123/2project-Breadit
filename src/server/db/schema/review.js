const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({

    review_id: String,
    user_id : String,
    rating: Number,
    content: String,
    can_post: { 
        type: Boolean,
        default: true 
      }},
      {
        timestamps: true,
        versionKey: false,
      }
    );


const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

