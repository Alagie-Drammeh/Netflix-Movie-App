/**
 * @desc function that saves the retrived data from fetchData() on mongo
 */

const MovieSchema = require("../models/MovieSchema");
const TvSchema = require("../models/TvSchema");

module.exports = async (data) => {
  console.log("save");
  console.log(data);

  // /**
  //  * @desc if doesn't work
  //  */
  // if (!data.success) return console.log("Error fetching data!");

  // /**
  //  * @desc maps and saves Movies into Mongo
  //  */

  const promisesMovies = data.dataMovie.results.map((x) => {
    const item = new MovieSchema(x);

    item.save();

    if (item._id === null) return console.log("Error on saving in mongo");
    return item;
  });

  const responsesMovies = await Promise.all(promisesMovies);

  console.log(responsesMovies);

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
