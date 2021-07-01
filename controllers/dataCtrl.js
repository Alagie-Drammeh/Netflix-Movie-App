/**
 * @desc Ctrl for data route
 */

const axios = require("axios");

const axiosConfig = require("../functions/axiosConfig");

/**
 * @desc URLs
 */

const pages = 1;
const language = "en-US";
const apiKey = process.env.API_KEY;

const urlMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=${language}&page=${pages}`;
const urlTv = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=${language}&page=${pages}`;

/**
 * @desc swagger docs
 */
/**
 * @swagger
 * /api/data:
 *   get:
 *     summary: Retrieve the most popular Movies and TvShow from The Movie Database API.
 *     description: Is used by the server to retrive and save the data, returns an object with two arrays `dataMovie` and `dataTv`.
 *     responses:
 *       200:
 *         description: Movie and TvShows, see the object examples bellow.
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
     * @desc double request for Movie / TV
     */
    const responseMovie = await axios(axiosConfig("GET", urlMovies));
    const responseTv = await axios(axiosConfig("GET", urlTv));

    return res.json({
      success: true,
      dataMovie: JSON.parse(responseMovie.data),
      dataTv: JSON.parse(responseTv.data),
      status: 200,
    });
  } catch (error) {
    console.log(error);
    console.log(error.response.status, error.response.statusText);

    return next({
      success: false,
      message: `${error.response.status} ${error.response.statusText}`,
      status: error.response.status,
      error: error,
    });
  }
};
