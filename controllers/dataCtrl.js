/**
 * @desc Ctrl for data route
 */

const axios = require("axios");

const axiosConfig = require("../functions/axiosConfig");

/**
 * @desc URLs
 */
// pages to retrieve
const numberOfPages = 100; // every page 20 elements

const language = "en-US";
const apiKey = process.env.API_KEY;

// basic url to fetch data
const urlMovies = `https://api.themoviedb.org/3/movie/popular`;
const urlTv = `https://api.themoviedb.org/3/tv/popular`;

/**
 * @desc creates URLs array
 * @returns array with url to call with axios
 * @requires url
 */

const createArrayUrls = (url) => {
  let array = [];
  for (let i = 1; i < numberOfPages; i++) {
    array.push(`${url}?api_key=${apiKey}&language=${language}&page=${i}`);
  }
  return array;
};

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

    // map  the arrUrlsMovies for multiple pages request
    const responseMovie = createArrayUrls(urlMovies).map((x) => {
      const response = axios(axiosConfig("GET", x));
      return response;
    });
    let responses = [];
    responses = await Promise.all(responseMovie);

    // array of movies
    const arrMovies = [];
    // merge array of movies
    responses.map((x) => {
      arrMovies.push(...JSON.parse(x.data).results);
    });

    // map  the arrUrlsTv for multiple pages request
    const responseTv = createArrayUrls(urlTv).map((x) => {
      const response = axios(axiosConfig("GET", x));
      return response;
    });

    responses = await Promise.all(responseTv);

    // array of Tv shows
    const arrTv = [];
    // merge array of Tv shows
    responses.map((x) => {
      arrTv.push(...JSON.parse(x.data).results);
    });

    return res.json({
      success: true,
      dataMovie: arrMovies,
      // dataMovie: JSON.parse(responseMovie.data),
      dataTv: arrTv,
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
