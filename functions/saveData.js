/**
 * @desc function that saves the retrived data from fetchData() on mongo
 * creates the genres present in the downloaded data and saves in mongo
 */

const MovieSchema = require("../models/MovieSchema");
const TvSchema = require("../models/TvSchema");
const GenreMovieSchema = require("../models/GenreMovieSchema");
const GenreTvSchema = require("../models/GenreTvSchema");

const filterGenres = require("./filterGenres");
const saveDataMongo = require("./saveDataMongo");

module.exports = async (data) => {
  /**
   * @desc if doesn't work
   */
  if (!data.success) return console.log("Error fetching data!");

  /**
   * @desc gets the arrays with the AVAILABLE genres in Mongo
   * @function filterGenres
   * @requires arrAllItems
   * @requires arrAllGenres
   */

  const arrMoviesGenres = filterGenres(data.dataMovie, data.genresMovie);
  const arrTvShowsGenres = filterGenres(data.dataTv, data.genresTv);

  const moviesGenres = saveDataMongo(arrMoviesGenres, GenreMovieSchema);
  const tvShowsGenres = saveDataMongo(arrTvShowsGenres, GenreTvSchema);

  /**
   * @desc maps and saves Movies into Mongo
   */

  const movies = saveDataMongo(data.dataMovie, MovieSchema);
  /**
   * @desc maps and saves TvShows
   */
  const tvShows = saveDataMongo(data.dataTv, TvSchema);

  /**
   * @desc return responses
   */

  return { movies, tvShows, moviesGenres, tvShowsGenres };
};
