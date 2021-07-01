/**
 * @function saveDataMongo save data in Mongo in a SINGLE collection
 * @requires dataArray
 * @requires MongoSchema
 *
 */

module.exports = async (data, schema) => {
  const allPromises = data.map((x) => {
    const item = new schema(x);

    item.save();

    if (item._id === null) return console.log("Error on saving in mongo");

    return item;
  });

  const responses = await Promise.all(allPromises);

  return responses;
};
