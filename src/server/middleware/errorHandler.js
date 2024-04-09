// const express = require('express');
// const app = express();

// // 일반적인 라우트 핸들러
// app.get('/', (req, res) => {
//   // 에러 발생 시뮬레이션
//   throw new Error('예기치 않은 에러 발생');
// });

// // 404 에러 핸들러
// app.use((req, res, next) => {
//   const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
//   error.status = 404;
//   next(error);
// });

// // 에러 핸들러 미들웨어
// app.use((err, req, res, next) => {
//   if (err.status === 400) {
//     res.status(400).send('Not Implemented');
//     return;
//   }

//   if (err.status === 502) {
//     res.status(502).send('Bad Gateway');
//     return;
//   }

//   res.locals.message = err.message;
//   res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
//   res.status(err.status || 500);
//   res.json('error');
// });

// app.listen(3000, () => {
//   console.log('3000번 포트에서 서버가 실행 중입니다.');
// });

// middlewares/errorHandler.js

const errorHandler = (error, req, res, next) => {
  // 에러 상태 코드가 지정되어 있지 않다면 500 (Internal Server Error) 사용
  const status = error.status || 500;
  // 에러 메시지가 지정되어 있지 않다면 일반적인 서버 에러 메시지 사용
  const message =
    error.message || "일반적인 서버 에러 메세지 ~~~ Internal Server Error!!";

  // 클라이언트에 에러 상태 코드와 메시지를 JSON 형태로 전송
  res.status(status).json({ error: message });
  // next();
};

module.exports = errorHandler;
