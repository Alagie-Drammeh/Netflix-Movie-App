/**
 * @desc function that saves the retrived data from fetchData() on mongo
 */

const MovieSchema = require("../models/MovieSchema");
const TvSchema = require("../models/TvSchema");

module.exports = async (data) => {
  /**
   * @desc if doesn't work
   */
  if (!data.success) return console.log("Error fetching data!");

  /**
   * @desc extract genres
   */
  const arrMoviesGenres = [];
  data.dataMovie.results.map((x, i) => {
    return arrMoviesGenres.push(x.genre_ids);
  });

  const arrTvGenres = [];
  data.dataTv.results.map((x, i) => {
    return arrTvGenres.push(x.genre_ids);
  });

  /**
   * @desc creates unique arrays
   */

  const arrMoviesGenresFinal = [...new Set(arrMoviesGenres.flat())];
  const arrTvGenresFinal = [...new Set(arrTvGenres.flat())];

  /**
   * @desc filters and create an array with the existing genres
   */
  const filterGenresMovie = [];

  data.genresMovie.map((x, i) => {
    for (let i = 0; i < arrMoviesGenresFinal.length; i++) {
      if (x.id === arrMoviesGenresFinal[i]) {
        filterGenresMovie.push(x);
      }
    }
  });

  const filterGenresTv = [];

  data.genresTv.map((x, i) => {
    for (let i = 0; i < arrTvGenresFinal.length; i++) {
      if (x.id === arrTvGenresFinal[i]) {
        filterGenresTv.push(x);
      }
    }
  });

  /**
   * @desc maps and saves Movies into Mongo
   */

  const promisesMovies = data.dataMovie.results.map((x) => {
    const item = new MovieSchema(x);

    item.save();

    if (item._id === null) return console.log("Error on saving in mongo");
    return item;
  });

  const responsesMovies = await Promise.all(promisesMovies);

  /**
   * @desc maps and saves TvShows
   */

  const promisesTvShows = data.dataTv.results.map((x) => {
    const item = new TvSchema(x);

    item.save();

    if (item._id === null) return console.log("Error on saving in mongo");

    return item;
  });

  const responsesTvShows = await Promise.all(promisesTvShows);

  /**
   * @desc return responses
   */
  return { responsesMovies, responsesTvShows };
};
