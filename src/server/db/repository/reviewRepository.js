const mongoose = require('mongoose');
const reviewSchema = require('../schema/review');


const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;