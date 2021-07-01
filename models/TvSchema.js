/**
 * @desc Schema to store A Tv Show
 */

const mongoose = require("mongoose");

const TvSchema = mongoose.Schema({
  backdrop_path: {
    type: String,
    require: false,
  },
  first_air_date: {
    type: Date,
    require: true,
  },
  genre_ids: {
    type: Array,
    require: true,
  },
  id: {
    type: Number,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  origin_country: {
    type: Array,
    require: true,
  },
  original_language: {
    type: String,
    require: true,
  },
  original_name: {
    type: String,
    require: true,
  },
  overview: {
    type: String,
    require: true,
  },
  popularity: {
    type: Number,
    require: true,
  },
  poster_path: {
    type: String,
    require: true,
  },
  vote_average: {
    type: Number,
    require: true,
  },
  vote_count: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model("tvshows", TvSchema);
