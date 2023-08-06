"use strict";
const express = require("express");
//----
const { home, todoget } = require("../controller/getPoints");
//----
const getRoute = express.Router();
//----
getRoute.get("/", home);
getRoute.get("/todoget", todoget);
//----
module.exports = { routes: getRoute };
