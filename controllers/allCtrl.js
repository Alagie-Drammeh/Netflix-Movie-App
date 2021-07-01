/**
 * @desc Ctrl for search route
 */

// const url = require("url");
// const querystring = require("querystring");

const MovieSchema = require("../models/MovieSchema");
const TvSchema = require("../models/TvSchema");

exports.get = async (req, res, next) => {
  try {
    const allMovies = await MovieSchema.find({});
    const allTvShows = await TvSchema.find({});
    const allCollection = [...allMovies, ...allTvShows];

    /**
     * @desc Checks if a search is performed
     */
    if (req.query.hasOwnProperty("search")) {
      // create reg ex for the search
      terms = req.query.search;
      const re = new RegExp(terms, "i");

      /**
       * @desc searches into Movies
       */

      const foundItemsMovies = await MovieSchema.find({
        title: re,
        original_title: re,
        overview: re,
      });

      /**
       * @desc searches into TvShows
       */

      const foundItemsTv = await TvSchema.find({
        name: re,
        original_name: re,
        overview: re,
      });

      // merges arrays
      const foundItems = [...foundItemsMovies, ...foundItemsTv];

      return res.json({ success: true, data: foundItems, status: 200 });
    }

    return res.json({ success: true, data: allCollection, status: 200 });
  } catch (error) {
    return next({
      success: false,
      message: `${error.response.status} ${error.response.statusText}`,
      status: error.response.status,
      error: error,
    });
  }
};
