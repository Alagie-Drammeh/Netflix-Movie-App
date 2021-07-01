/**
 * @desc Ctrl for movies route
 */

const axios = require("axios");

const axiosConfig = require("../functions/axiosConfig");

const MovieSchema = require("../models/MovieSchema");

exports.get = async (req, res, next) => {
  try {
    const items = await MovieSchema.find({});

    /**
     * @desc checks if a query is called
     */

    if (req.url === "/?random") {
      // find random item
      const randomItem = items[Math.floor(Math.random() * items.length)];

      return res.json({ success: true, data: randomItem });
    }

    return res.json({ success: true, data: items, status: 200 });
  } catch (error) {
    return next({
      success: false,
      message: "Requested data does not exist",
      status: 404,
      error: error,
    });
  }
};
