"use strict";
const express = require("express");
//----
const {
  signin,
  signup,
  logout,
  todoPost,
  ITSMDailyStatus,
} = require("../controller/postPoints");
//----
const postRoute = express.Router();
//----
postRoute.post("/signin", signin);
postRoute.post("/signup", signup);
postRoute.post("/logout", logout);
postRoute.post("/todopost", todoPost);
postRoute.post("/ITSMresponse", ITSMDailyStatus);
//----
module.exports = { routes: postRoute };
