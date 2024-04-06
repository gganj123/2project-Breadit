const mongoose = require('mongoose');
const magazinePostSchema = require('../schema/magazinePost')

const MagazinePost = mongoose.model('MagazinePost', magazinePostSchema);

module.exports = MagazinePost;