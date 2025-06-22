const mongoose = require('mongoose');
const  {mongoUri}  = require("../env/index");
// const mongoUri="mongodb://localhost:27017/newstayfinder"
const connectDB = async () => {
  try {
    console.log(mongoUri)
    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.error(`MongoDB Connection Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;