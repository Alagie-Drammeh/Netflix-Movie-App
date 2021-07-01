/**
 * @desc function that retrives the data calling the local api/data
 * @returns data
 */
const axios = require("axios");

const urlGet = `http://localhost:5000/api/data`;

/**
 * @desc axios global config
 */
const axiosConfig = (method, url) => {
  const obj = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      //   Authorization: `Bearer ${spotifyToken}`,
    },
    url: url,
    transformResponse: [
      (data) => {
        return data;
      },
    ],
  };
  return obj;
};

module.exports = async () => {
  try {
    /**
     * @desc double request for Movie / TV
     */
    const response = await axios(axiosConfig("GET", urlGet));

    return JSON.parse(response.data);
  } catch (error) {
    console.log(error);
    console.log(error.response.status, error.response.statusText);

    return next({
      message: `${error.response.status} ${error.response.statusText}`,
      status: error.response.status,
    });
  }
};
