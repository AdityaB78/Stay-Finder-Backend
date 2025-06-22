const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/stayfinder',
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT || 5000,
  pixelsKey: process.env.PIXELES_API_KEY,
};