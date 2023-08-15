"use strict";
const express = require("express");
//----
const { deletetodo } = require("../controller/deletePoints");
//----
const deleteRoute = express.Router();
//----
deleteRoute.delete("/deletetodo", deletetodo);
//----
module.exports = { routes: deleteRoute };
