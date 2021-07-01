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
