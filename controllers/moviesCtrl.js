/**
 * @desc Ctrl for movies route
 */

const MovieSchema = require("../models/MovieSchema");

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Retrieve all the Movies from MongoDB, query `/?random` optional returns random item.
 *     description: Default= returns obj with array `data` with all the movies. Optional param `/?random` (i.e. `/api/movies/?random`) returns a random movie.
 *     parameters:
 *       - in: query
 *         name: random
 *         description: i.e. `/?random` returns random item
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
    const items = await MovieSchema.find({});

    /**
     * @desc checks if a query is called
     */

    if (req.url === "/?random") {
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
