/**
 * @desc function that retrives the data calling the local api/data
 * @returns data
 */
const axios = require("axios");
const axiosConfig = require("./axiosConfig");

const urlGet = `http://localhost:5000/api/data`;

/**
 * @desc data to retrieves genres
 */
const language = "en-US";
const apiKey = process.env.API_KEY;

const urlGenresMovie = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=${language}`;
const urlGenresTvShow = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=${language}`;

module.exports = async () => {
  try {
    /**
     * @desc double request for Movie / TV
     */
    const responseData = await axios(axiosConfig("GET", urlGet));

    const responseGenresMovie = await axios(axiosConfig("GET", urlGenresMovie));
    const responseGenresTvShow = await axios(
      axiosConfig("GET", urlGenresTvShow)
    );
    /**
     * @desc creates obj with all the data in it
     */
    return {
      ...JSON.parse(responseData.data),
      genresMovie: JSON.parse(responseGenresMovie.data).genres,
      genresTv: JSON.parse(responseGenresTvShow.data).genres,
    };
  } catch (error) {
    console.log(error);
    console.log(error.response.status, error.response.statusText);

    return next({
      message: `${error.response.status} ${error.response.statusText}`,
      status: error.response.status,
    });
  }
};
