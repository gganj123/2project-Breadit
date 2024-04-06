const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({

    review_id: mongoose.Schema.Types.ObjectId,
    nickname : String,
    post_id: String,
    rating: Number,
    content: String,
    can_post: { 
        type: Boolean,
        default: true 
      }},
      {
        timestamps: true
      }
    );


module.exports = reviewSchema;

