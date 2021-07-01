/**
 * @desc MongoDB Connection
 */

const mongoose = require("mongoose");

// const config = require("config");

const db = process.env.MONGODB_URI;

const dbOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const connectDB = async () => {
  try {
    await mongoose.connect(db, dbOptions);
    return { connected: true };
  } catch (error) {
    console.log(error.message);
    return next({
      success: false,
      message: `${error.response.status} ${error.response.statusText}`,
      status: error.response.status,
      error: error,
    });
  }
};

module.exports = connectDB;
