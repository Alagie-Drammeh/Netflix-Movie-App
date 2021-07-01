/**
 * @desc Ctrl for search route
 */

const MovieSchema = require("../models/MovieSchema");
const TvSchema = require("../models/TvSchema");

/**
 * @swagger
 * /api/all:
 *   get:
 *     summary: Retrieve all data stored from MongoDB, query `?search=` optional returns searched items.
 *     description: Default= returns obj with array `data` with all the movies and tv shows. Optional param `/?search=` (i.e. `/api/all?search=`) returns searched items.
 *     parameters:
 *       - in: query
 *         name: search
 *         description: i.e. `Luca` returns random item
 *     responses:
 *       200:
 *         description: Movie, see the object examples bellow.
 *         content:
 *           Movie Object - application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                        adult:
 *                          type: boolean
 *                          description: Boolean Value
 *                          example: false
 *                        backdrop_path:
 *                          type: string
 *                          example: "/620hnMVLu6RSZW6a5rwO8gqpt0t.jpg"
 *                        genre_ids:
 *                          type: array
 *                          example: [16, 35, 10751, 14]
 *                        id:
 *                          type: number
 *                          example: 508943
 *                        original_language:
 *                          type: string
 *                          example: "en"
 *                        original_title:
 *                          type: string
 *                          example: "Original Title"
 *                        overview:
 *                          type: string
 *                          example: "Bla bla bla..."
 *                        popularity:
 *                          type: number
 *                          example: 508943.609
 *                        poster_path:
 *                          type: string
 *                          example: "/jTswp6KyDYKtvC52GbHagrZbGvD.jpg"
 *                        release_date:
 *                          type: data
 *                          example: "2021-06-17"
 *                        title:
 *                          type: string
 *                          example: "Title"
 *                        video:
 *                          type: string
 *                          example: false
 *                        vote_average:
 *                          type: number
 *                          example: 9.8
 *                        vote_count:
 *                          type: number
 *                          example: 2300
 *           Tv Show Object- application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                        backdrop_path:
 *                          type: string
 *                          example: "/620hnMVLu6RSZW6a5rwO8gqpt0t.jpg"
 *                        first_air_date:
 *                          type: data
 *                          example: "2021-06-17"
 *                        genre_ids:
 *                          type: array
 *                          example: [16, 35, 10751, 14]
 *                        id:
 *                          type: number
 *                          example: 508943
 *                        name:
 *                          type: string
 *                        origin_country:
 *                          type: array
 *                          example: ["US"]
 *                        original_language:
 *                          type: string
 *                          example: "en"
 *                        original_name:
 *                          type: string
 *                          example: "Original Name"
 *                        overview:
 *                          type: string
 *                          example: "Bla bla bla..."
 *                        popularity:
 *                          type: number
 *                          example: 555.90
 *                        poster_path:
 *                          type: string
 *                          example: "/jTswp6KyDYKtvC52GbHagrZbGvD.jpg"
 *                        vote_average:
 *                          type: number
 *                          example: 55.9
 *                        vote_count:
 *                          type: number
 *                          example: 2300
 */

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
