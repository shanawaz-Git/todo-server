"use strict";
const express = require("express");
//----
const {
  signin,
  signup,
  logout,
  todoPost,
} = require("../controller/postPoints");
//----
const postRoute = express.Router();
//----
postRoute.post("/signin", signin);
postRoute.post("/signup", signup);
postRoute.post("/logout", logout);
postRoute.post("/todopost", todoPost);
//----
module.exports = { routes: postRoute };
