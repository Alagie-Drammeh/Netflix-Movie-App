/**
 * @desc Route that returns serached items
 */

const express = require("express");
const Router = express();

const { get } = require("../controllers/allCtrl");

/**
 * @desc GET
 */

Router.get("/", get);

module.exports = Router;
