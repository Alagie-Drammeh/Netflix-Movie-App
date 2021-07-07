/**
 * @desc Ctrl for movies route
 */

const MovieSchema = require("../models/MovieSchema");
const GenreMovieSchema = require("../models/GenreMovieSchema");

const shuffleArray = require("../functions/shuffleArray");

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
 *         example: 5
 *         description: i.e. use just `random` to return ALL items in random order, or i.e. `5` to get 5 random items
 *       - in: query
 *         name: genres
 *         example: thriller
 *         description: i.e. `genres` returns all the genres. `genres=Thriller` returns the items of the specific one.
 *       - in: query
 *         name: items
 *         example: 5
 *         description: i.e. `items=5` returns 5 items. `genres=all` returns all the items.
 *       - in: query
 *         name: genres=thriller&items=5
 *         description: i.e. example how to 5 items of a genre, use random to get random items
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
     * @desc can be combined with "items" query
     */

    if (req.query.hasOwnProperty("genres")) {
      // if not specified returns all
      if (req.query.genres.length === 0 || req.query.genres === "all") {
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

      /**
       * @desc check if items and random are in the query
       * @returns a randpm array of n° items
       */
      if (
        req.query.hasOwnProperty("items") &&
        Number(req.query.items) !== 0 &&
        req.query.hasOwnProperty("random")
      ) {
        // shuffles array
        const randomItems = shuffleArray(findItemsGenre);

        const arrNumberOfItems = randomItems.splice(0, Number(req.query.items));
        return res.json({ success: true, data: arrNumberOfItems, status: 200 });
      }

      /**
       * @desc check if items is in the query
       */
      if (req.query.hasOwnProperty("items") && Number(req.query.items) !== 0) {
        const arrNumberOfItems = findItemsGenre.splice(
          0,
          Number(req.query.items)
        );
        return res.json({ success: true, data: arrNumberOfItems, status: 200 });
      }

      // return items
      return res.json({ success: true, data: findItemsGenre, status: 200 });
    }

    /**
     * @desc checks if items param is called
     */
    if (req.query.hasOwnProperty("items")) {
      // if not specified or all returns all items
      if (req.query.items === 0 || req.query.items === "all") {
        return res.json({ success: true, data: items, status: 200 });
      }
      if (Number(req.query.items) !== 0) {
        // creates array with the requested n° of items
        const numberOfItems = items.splice(0, Number(req.query.items));

        return res.json({ success: true, data: numberOfItems, status: 200 });
      }
    }

    /**
     * @desc checks if random is called
     */
    if (req.query.hasOwnProperty("random")) {
      // if no number specified or "all" is passed returns all the db randomized
      if (req.query.random.length === 0 || req.query.random === "all") {
        // shuffles array
        const randomItems = shuffleArray(items);

        return res.json({ success: true, data: randomItems, status: 200 });
      }

      // if a number is specified
      if (Number(req.query.random) !== 0) {
        // shuffles array
        const randomItems = shuffleArray(items).splice(
          0,
          Number(req.query.random)
        );

        return res.json({ success: true, data: randomItems, status: 200 });
      }
    }

    // renders if no query is passed
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
