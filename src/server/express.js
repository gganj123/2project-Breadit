const express = require('express');
const magazineRouter = require('./routes/magazineRouter');
const breadRouter = require('./routes/breadRouter');
const commentRouter = require('./routes/commentRouter');
const postRouter = require('./routes/postRouter');
const recipeRouter = require('./routes/recipeRouter');
const reviewRouter = require('./routes/reviewRouter');
const userRouter = require('./routes/userRouter');

// Express 앱을 초기화합니다.
const app = express();

// 라우터를 적절한 기본 경로와 함께 사용합니다.
app.use('/api/magazines', magazineRouter);
app.use('/api/breads', breadRouter);
app.use('/api/comments', commentRouter);
app.use('/api/posts', postRouter);
app.use('/api/recipes', recipeRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/users', userRouter);

// 서버를 시작합니다.
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 실행 중입니다.`);
});