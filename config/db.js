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

// mongoose.connect(db, dbOptions);

/**
 * @desc the connected db will listen to the next listeners
 */

/**
 * @desc Open connection
 */
// mongoose.connection.on("open", () => console.log("Connection opened"));

/**
 * @desc catches errors
 */
mongoose.connection.on("error", (err) => console.log(err));

/**
 * @desc catches disconnetions
 */
mongoose.connection.on("disconnected", () => console.log(`DB disconnected`));

// CTRL-C
process.on("SIGINT", () => {
  // calls the function above
  mongoose.connection.close();
  process.exit();
});

const connectDB = async () => {
  try {
    await mongoose.connect(db, dbOptions);
    return { connected: true };
  } catch (err) {
    console.log(err.message);
    process.on("SIGINT", () => {
      // calls the function above
      mongoose.connection.close();
      process.exit(1);
    });
  }
};

module.exports = connectDB;
