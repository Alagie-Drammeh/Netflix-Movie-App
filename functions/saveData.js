/**
 * @desc funciton that saves the retrived data from fetchData() on mongo
 */

/**
 * @function deleteCollection
 * @requires collectionName
 */

const MovieSchema = require("../models/MovieSchema");
const TvSchema = require("../models/TvSchema");

module.exports = async (data) => {
  /**
   * @desc if doesn't work
   */
  if (!data.success) return console.log("Error fetching data!");

  /**
   * @desc maps and saves Movies
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
  //   return responsesMovies;

  //   try {
  //     let album = await MovieSchema.findOne({ albumCode });

  //     if (album) {
  //       await deleteSchema(userCode);
  //       return next({
  //         message: "Album already exist!",
  //         status: 400,
  //       });
  //     }

  //     album = new SpotifyAlbum({
  //       albumCode,
  //       albumGenres,
  //     });

  //     const resAlbum = await album.save();

  //     // deletes schema with find schema function
  //     await deleteSchema(userCode);

  //     // send just created id back
  //     return { success: true, data: res.json(resAlbum).statusCode };
  //   } catch (error) {
  //     console.log(error);
  //     console.log(error.response.status, error.response.statusText);

  //     return next({
  //       message: error.response.statusText,
  //       status: error.response.status,
  //     });
  //   }
};
