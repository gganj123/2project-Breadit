const mongoose = require("mongoose");
const bookmarkSchema = require("../schema/bookmark");

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

module.exports = Bookmark;
