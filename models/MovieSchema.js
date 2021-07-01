/**
 * @desc Schema to store A Movie
 */

const mongoose = require("mongoose");

const MovieSchema = mongoose.Schema({
  adult: {
    type: Boolean,
    require: false,
  },
  backdrop_path: {
    type: String,
    require: false,
  },
  genre_ids: {
    type: Array,
    require: true,
  },
  id: {
    type: Number,
    require: true,
  },

  original_language: {
    type: String,
    require: true,
  },
  original_title: {
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
  release_date: {
    type: Date,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  video: {
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

module.exports = mongoose.model("movies", MovieSchema);
