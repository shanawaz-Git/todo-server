"use strict";
const { todo } = require("../schemas/todosSchema");

exports.home = (req, res, next) => {
  try {
    res.status(200).send("welcome to TODO Backend");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.todoget = async (req, res) => {
  try {
    var { role, _id, email } = req.user;
    await todo
      .find(
        { createdBy: new Object(_id) },
        {
          createdAt: false,
          updatedAt: false,
          __v: false,
          active: false,
        }
      )
      .then(async (data) => {
        if (data.length == 0) {
          return res.send({
            code: 201,
            status: "Failure",
            message: `No todos available`,
          });
        } else {
          return res.send({
            code: 200,
            status: "Success",
            message: `success`,
            count: data.length,
            data: data,
          });
        }
      });
  } catch (e) {
    return res.send({
      error: "error" + e,
    });
  }
};
