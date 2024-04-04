const mongoose = require('mongoose');
const arrayLimit = (val) => val.length <= 5;


const magazinePostSchema = require('../schema/magazinePostSchema');
const MagazinePost = mongoose.model('MagazinePost', magazinePostSchema);

module.exports = MagazinePost;