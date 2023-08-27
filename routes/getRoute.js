"use strict";
const express = require("express");
//----
const { home, todoget, getITSMresponse } = require("../controller/getPoints");
//----
const getRoute = express.Router();
//----
getRoute.get("/", home);
getRoute.get("/todoget", todoget);
getRoute.get("/getitsmresponse", getITSMresponse);
//----
module.exports = { routes: getRoute };
