const dotenv = require("dotenv");
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const VITE_KAKAO_CLIENT_ID = process.env.VITE_KAKAO_CLIENT_ID;
const VITE_REDIRECT_URI = process.env.VITE_REDIRECT_URI;

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_DB_URI;
dotenv.config();

module.exports = {
  applicationName: process.env.APPLICATION_NAME,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  PORT,
  MONGO_URI,
  kakao: {
    clientId: VITE_KAKAO_CLIENT_ID,
    redirectUri: VITE_REDIRECT_URI,
  },
};
