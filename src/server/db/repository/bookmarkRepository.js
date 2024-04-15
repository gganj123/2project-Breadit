const mongoose = require("mongoose");
const bookmarkSchema = require("../schema/bookmark");

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

Bookmark.findOneAndRemove = async function (filter) {
  try {
    const removedBookmark = await this.findOneAndDelete(filter);
    return removedBookmark;
  } catch (error) {
    throw error;
  }
};

module.exports = Bookmark;
