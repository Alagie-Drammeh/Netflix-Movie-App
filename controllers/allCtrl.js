/**
 * @desc Ctrl for all data stored in mongo
 */

const MovieSchema = require("../models/MovieSchema");
const TvSchema = require("../models/TvSchema");

const shuffleArray = require("../functions/shuffleArray");

/**
 * @desc swagger docs
 */

/**
 * @swagger
 * /api/all:
 *   get:
 *     summary: Retrieve all data stored in MongoDB, query `?search=` optional returns searched items.
 *     description: Default= returns obj with `data` containing the arrays `movies` and `tvshows`, with all the movies and tv shows. Optional param `/?search=` (i.e. `/api/all?search=`) returns searched items.
 *     parameters:
 *       - in: query
 *         name: search
 *         description: i.e. `Luca` returns searched items
 *       - in: query
 *         name: movies
 *         description: returns ALL the Movies. i.e. `?movies=10` returns the lastest 10 Movies.
 *       - in: query
 *         name: tvshows
 *         description: returns ALL the Tv Shows. i.e. `?tvshows=10` returns the lastest 10 Tv Shows. i.e. `?tvshows=10&random` returns 10 random Tv Shows.
 *       - in: query
 *         name: random
 *         description: i.e. `?random=10` returns 10 random items (movies or shows), OR i.e. `?movies=10&random` returns 10 random Movies.
 *       - in: query
 *         name: from
 *         description: i.e. `?from=0` returns elements from position 0. Must be used with `totalitems`
 *       - in: query
 *         name: totalitems
 *         description: i.e. `?totalitems=10` returns 10 elements. Must be used with `from`
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
    /**
     * @desc query ?items= returns a specific number of elements
     */
    if (
      req.query.hasOwnProperty("from") &&
      Number(req.query.from) >= 0 &&
      req.query.hasOwnProperty("totalitems") &&
      Number(req.query.totalitems) !== 0
    ) {
      const movies = await MovieSchema.find({})
        .skip(Number(req.query.from))
        .limit(Number(req.query.totalitems));

      const tvshows = await TvSchema.aggregate()
        .skip(Number(req.query.from))
        .limit(Number(req.query.totalitems));

      return res.json({
        success: true,
        data: { movies: movies, tvshows: tvshows },
        status: 200,
      });
    }

    /**
     * @desc query ?random=XX returns a specific number of random elements
     */
    if (req.query.hasOwnProperty("random") && Number(req.query.random) !== 0) {
      const randomMovie = await MovieSchema.aggregate().sample(
        Number(req.query.random)
      );
      const randomTvShows = await TvSchema.aggregate().sample(
        Number(req.query.random)
      );
      const allItems = [...randomMovie, ...randomTvShows];

      // shuffles array and splice
      const randomItems = shuffleArray(allItems);
      const spliceItems = randomItems.splice(0, Number(req.query.random));

      return res.json({ success: true, data: spliceItems, status: 200 });
    }

    /**
     * @desc check if "movies" is in the query
     */
    if (req.query.hasOwnProperty("movies")) {
      /**
       * @desc if has no param returns all the movies
       */
      if (Number(req.query.movies) === 0) {
        const allMovies = await MovieSchema.find({});
        return res.json({ success: true, data: allMovies, status: 200 });
      }

      /**
       * @desc if has params or &random return n° of items
       */
      if (Number(req.query.movies) !== 0) {
        const allMovies = await MovieSchema.find({}).limit(
          Number(req.query.movies)
        );

        // random
        if (req.query.hasOwnProperty("random")) {
          const randomItems = await MovieSchema.aggregate().sample(
            Number(req.query.movies)
          );

          return res.json({
            success: true,
            data: randomItems,
            status: 200,
          });
        }

        return res.json({ success: true, data: allMovies, status: 200 });
      }
    }

    /**
     * @desc check if "movies" is in the query
     */
    if (req.query.hasOwnProperty("tvshows")) {
      /**
       * @desc if has no param returns all the movies
       */
      if (Number(req.query.tvshows) === 0) {
        const allTvShows = await TvSchema.find({});
        return res.json({ success: true, data: allTvShows, status: 200 });
      }

      /**
       * @desc if has params or &random return n° of items
       */
      if (Number(req.query.tvshows) !== 0) {
        const allTvShows = await TvSchema.find({}).limit(
          Number(req.query.tvshows)
        );

        // random
        if (req.query.hasOwnProperty("random")) {
          const randomItems = await TvSchema.aggregate().sample(
            Number(req.query.tvshows)
          );

          return res.json({
            success: true,
            data: randomItems,
            status: 200,
          });
        }

        return res.json({ success: true, data: allTvShows, status: 200 });
      }
    }

    /**
     * @desc no params threfore returns ALL (movies and tv shows)
     */

    const allMovies = await MovieSchema.find({});
    const allTvShows = await TvSchema.find({});
    // const allCollection = [...allMovies, ...allTvShows];

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

    return res.json({
      success: true,
      data: { movies: allMovies, tvshows: allTvShows },
      status: 200,
    });
  } catch (error) {
    return next({
      success: false,
      message: `${error.response.status} ${error.response.statusText}`,
      status: error.response.status,
      error: error,
    });
  }
};
