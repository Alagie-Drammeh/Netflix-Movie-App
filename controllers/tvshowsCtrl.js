/**
 * @desc Ctrl for tvshows route
 */

const TvSchema = require("../models/TvSchema");

exports.get = async (req, res, next) => {
  try {
    const items = await TvSchema.find({});
    /**
     * @desc checks if a query is called
     */
    if (req.url === "/?random") {
      // find random item
      const randomItem = items[Math.floor(Math.random() * items.length)];

      return res.json({ success: true, data: randomItem, status: 200 });
    }

    return res.json({ success: true, data: items });
  } catch (error) {
    return next({
      success: false,
      message: "Requested data does not exist",
      status: 404,
      error: error,
    });
  }
};
