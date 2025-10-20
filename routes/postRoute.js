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
  addExpense,
  addNotes,
  addNotesUser,
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
postRoute.post("/exp/add", addExpense);
postRoute.post("/notestaker/add", addNotes);
postRoute.post("/notestaker/regUser", addNotesUser);

//----
module.exports = { routes: postRoute };
