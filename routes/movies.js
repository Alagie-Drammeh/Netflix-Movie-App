/**
 * @desc Route that retrive data from api/movies
 */

const express = require("express");
const Router = express();

const { get } = require("../controllers/moviesCtrl");

/**
 * @desc GET
 */

Router.get("/", get);

module.exports = Router;
