/**
 * @desc Ctrl for movies route
 */

const MovieSchema = require("../models/MovieSchema");
const GenreMovieSchema = require("../models/GenreMovieSchema");

/**
 * @desc swagger docs
 */

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Retrieve all the Movies from MongoDB, optionals queries `/?random`, `genres`.
 *     description: Default returns obj with array `data` with all the movies. Optional param `/?random` (i.e. `/api/movies/?random`) returns a random movie, and `genres=` returns the genres avaible in Mongo.
 *     parameters:
 *       - in: query
 *         name: random
 *         description: i.e. `/?random` returns random item
 *       - in: query
 *         name: genres
 *         description: i.e. `genres` returns all the genres. `genres=Thriller` returns the items of the specific one.
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
 *           Genres Object - application/json:
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
 */

exports.get = async (req, res, next) => {
  try {
    const items = await MovieSchema.find({});

    /**
     * @desc checks if a search is called
     */

    if (req.query.hasOwnProperty("genres")) {
      // if not specified returns all
      if (req.query.genres.length === 0) {
        const items = await GenreMovieSchema.find({});
        return res.json({ success: true, data: items, status: 200 });
      }

      terms = req.query.genres;
      const re = new RegExp(terms, "i");
      const items = await GenreMovieSchema.find({ name: re });

      // returns 404 if not found
      if (items.length === 0) {
        return next({
          success: false,
          message: "Requested data does not exist",
          status: 404,
        });
      }

      // get id from item
      const getId = items[0].id;

      // find items
      const findItemsGenre = await MovieSchema.find({ genre_ids: getId });
      // return items
      return res.json({ success: true, data: findItemsGenre, status: 200 });
    }

    /**
     * @desc checks if random is called
     */
    if (req.url === "/?random") {
      /**
       * @desc checks if a query is called
       */

      // find random item
      const randomItem = items[Math.floor(Math.random() * items.length)];

      return res.json({ success: true, data: randomItem });
    }

    return res.json({ success: true, data: items, status: 200 });
  } catch (error) {
    return next({
      success: false,
      message: "Requested data does not exist",
      status: 404,
      error: error,
    });
  }
};
