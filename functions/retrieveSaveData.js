const fetchData = require("./fetchData");
const saveData = require("./saveData");
const deleteCollection = require("./deleteDataColl");

module.exports = () => {
  /**
   * @desc first delete collection
   * @function deleteCollection
   * @requires array
   */

  deleteCollection(["movies", "tvshows"]).then((res) => {
    console.log("Deleting old data...");
    if (res) {
      console.log("Fetching data...");
      /**
       * @desc fetch data
       */
      return fetchData().then((res) => {
        console.log("Saving data...");
        /**
         * @desc save data
         */
        return saveData(res);
      });
    }

    return console.log("Mongo Error!");
  });
};
