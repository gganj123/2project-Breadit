// const AppError = require('../errors/AppError')
// const commonErrors = require('../errors/commonErrors')
const dotenv = require("dotenv");
dotenv.config();
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_DB_URI;

console.log(`sddssd: ${accessTokenSecret}`);

// const envFound = dotenv.config();

// if (envFound.error) {
//   throw new AppError(commonErrors.configError, "Couldn't find .env file")
// }

// if (process.env.MONGO_URI === undefined) {
//   throw new AppError(
//     commonErrors.configError,
//     '어플리케이션을 시작하려면 Mongo DB URI(MONGODB_URI) 환경변수가 필요합니다.',
//   )
// }

module.exports = {
  applicationName: process.env.APPLICATION_NAME,

  accessTokenSecret,
  refreshTokenSecret,

  PORT,
  MONGO_URI,
  // mongoDBUri: 1
};
