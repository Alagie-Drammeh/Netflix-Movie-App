/**
 * @desc Route that retrive data from themoviedb.org
 */

const express = require("express");
const Router = express();

const { get } = require("../controllers/dataCtrl");

/**
 * @desc GET
 */

Router.get("/", get);

module.exports = Router;
