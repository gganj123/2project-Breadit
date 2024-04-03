// 댓글
const commentSchema = new mongoose.Schema({
  comment_id : String,
  user_id : String,
  posted_id : String,
  date: Date,
  content: String,
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;