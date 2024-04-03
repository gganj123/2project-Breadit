// 댓글
const commentSchema = new mongoose.Schema({
  comment_id : String,
  user_id : String,
  post_id: { type: mongoose.Schema.Types.ObjectId},
  created_at: { type: Date, default: Date.now },//타임스탬프로 작성하는것이 데이터 처리가 더 효과적인지 질문
  content: String,
  can_post: { 
    type: Boolean,
    default: true 
  }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;