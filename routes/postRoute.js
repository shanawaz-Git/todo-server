"use strict";
const express = require("express");
//----
const {
  signin,
  signup,
  logout,
  todoPost,
  ITSMDailyStatus,
  getRandomData,
} = require("../controller/postPoints");
//----
const upload = require("../middleware/awss3");
//----
const postRoute = express.Router();
//----
postRoute.post("/signin", signin);
postRoute.post("/signup", signup);
postRoute.post("/logout", logout);
postRoute.post("/todopost", todoPost);
postRoute.post("/ITSMresponse", upload.single("file"), ITSMDailyStatus);
postRoute.post("/aitest", getRandomData);

//----
module.exports = { routes: postRoute };
