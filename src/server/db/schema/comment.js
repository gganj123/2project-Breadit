// 댓글
const commentSchema = new mongoose.Schema({
  comment_id : String,
  user_id : String,
  date: Date,
  content: String
});
