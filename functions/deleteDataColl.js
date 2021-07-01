/**
 * @desc Delete collections from mongo
 * @requires array of collection(s) name
 */

const mongoose = require("mongoose");

module.exports = async (collectionsArray) => {
  const promisesDelete = collectionsArray.map((x) => {
    const deleteColl = delete mongoose.connection.db.dropCollection(`${x}`);

    return deleteColl;
  });

  const promises = await Promise.all(promisesDelete);

  return promises;
};
