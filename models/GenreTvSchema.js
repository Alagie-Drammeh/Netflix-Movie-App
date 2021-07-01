/**
 * @desc Schema to store a Genre of the TvShow
 */

const mongoose = require("mongoose");

const GenreTvSchema = mongoose.Schema({
  id: {
    type: Number,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("genres_tvshows", GenreTvSchema);
