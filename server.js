/**
 * @desc Server
 */
const express = require("express");
const cors = require("cors");
var CronJob = require("cron").CronJob;
const connectDB = require("./config/db");

const createError = require("http-errors");

/**
 * @desc Import functions
 */
const fetchData = require("./functions/fetchData");
const saveData = require("./functions/saveData");
const deleteCollection = require("./functions/deleteDataColl");

const app = express();

/**
 * @desc external middleware
 */

app.use(cors());

const PORT = process.env.PORT;

/**
 * @desc MongoDB connect
 * @fires CronJob to call the db everyday
 * it waits mongo to be connected
 */

connectDB().then((res) => {
  if (res.connected) {
    // var job = new CronJob(
    // new CronJob(
    //   "*/03 */10 * * * *",
    //   //   "*/02 * * * * *",
    //   //   fetchData,
    //   //   fetchData().then((res) => console.log(res));
    //   () => console.log("Fetching"),
    //   null,
    //   true,
    //   "America/Los_Angeles"
    // );

    /**
     * @desc DISABLED
     */

    /**
     * @desc first delete collection
     * @function deleteCollection
     * @requires array
     */
    // deleteCollection(["movies", "tvshows"]).then((res) => {
    //   console.log("Deleting old data...");
    //   if (res) {
    //     console.log("Fetching data...");
    //     /**
    //      * @desc fetch data
    //      */
    //     return fetchData().then((res) => {
    //       console.log("Saving data...");
    //       /**
    //        * @desc save data
    //        */
    //       saveData(res);
    //     });
    //   }

    //   return console.log("Mongo Error!");
    // });

    /**
     * @desc DISABLED
     */

    return console.log(`MongoDB connected...`);
    //   .then((res) => console.log(res));
  }

  return console.log(`MongoDB NOT connected!`);
});

/**
 * @desc Routes
 */

// retrives data from API's
app.use("/api/data", require("./routes/data"));

/**
 * @desc returns movies
 * @default route returns all movies (ordered by popularity)
 * @query ?random returns a random item
 */
app.use("/api/movies", require("./routes/movies"));

/**
 * @desc returns tvshows
 * @default route returns all tvshows (ordered by popularity)
 * @query ?random returns a random item
 */
app.use("/api/tvshows", require("./routes/tvshows"));

/**
 * @desc search items
 * @query ?search= returns search item from both collections (databases)
 */
app.use("/api/all", require("./routes/all")); //

// app.use("/auth", require("")) // user authentication
// app.use("/users", require("")) // user sign up

/**
 * @desc 404 not found
 */

app.use((req, res, next) => {
  return res.status(404).send({ message: "not a valid route" });
});

// job.start();
// job.onComplete();
/**
 * @desc Global error handler middleware
 */

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  /**
   * @desc default 500
   */
  res
    .status(err.status || createError(500, "Internal Server Error"))
    // send the rest to the user
    .send({
      success: false,
      message: "Somenthig went wrong!",
      status: err.status,
      error: err.message,
    });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
