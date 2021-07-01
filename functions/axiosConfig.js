/**
 * @desc axios global config
 */
module.exports = (method, url) => {
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
