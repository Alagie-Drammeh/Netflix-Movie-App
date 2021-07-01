/**
 * @desc Route that retrive data from api/tvshows
 */

const express = require("express");
const Router = express();

const { get } = require("../controllers/tvshowsCtrl");

/**
 * @desc GET
 */

Router.get("/", get);

module.exports = Router;
