/**
 * @desc Server
 */
const express = require("express");
const cors = require("cors");
var CronJob = require("cron").CronJob;
const connectDB = require("./config/db");

const createError = require("http-errors");

/**
 * @desc Set API Specification
 * edit info in ./functions/swagger.js
 */

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./functions/swagger");

/**
 * @desc Import functions
 */

const retrieveSaveData = require("./functions/retrieveSaveData");

/**
 * @desc Assign express
 */

const app = express();

/**
 * @desc external middleware
 */

app.use(cors());

const PORT = process.env.PORT;

/**
 * @desc MongoDB connect
 * @fires CronJob to call the db mon_to_fri_at_11_30
 * it waits mongo to be connected
 */

connectDB().then((res) => {
  if (res.connected) {
    new CronJob(
      "00 30 11 * * 1-5",
      () => retrieveSaveData(),
      null,
      true,
      "America/Los_Angeles"
    );
    // retrieveSaveData();
    return console.log(`MongoDB connected...`);
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
 * @query ?genres returns a random item
 */
app.use("/api/movies", require("./routes/movies"));

/**
 * @desc returns tvshows
 * @default route returns all tvshows (ordered by popularity)
 * @query ?random returns a random item
 * @query ?genres returns a random item
 */
app.use("/api/tvshows", require("./routes/tvshows"));

/**
 * @desc search items
 * @query ?search= returns search item from both collections (databases)
 */
app.use("/api/all", require("./routes/all"));

/**
 * @desc Swagger UI
 */

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @desc 404 not found
 */

app.use((req, res, next) => {
  return res.status(404).send({ message: "not a valid route" });
});

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
