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
    var restodolist = {};
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
          data.forEach((todo) => {
            const category = todo.category;
            // if (!restodolist[category]) {
            //   restodolist[category] = [];
            // }
            // restodolist[category].push(todo);
            if (!restodolist[category]) {
              restodolist[category] = { category, data: [] };
            }
            restodolist[category].data.push(todo);
          });
          const resultArray = Object.values(restodolist);
          return res.send({
            code: 200,
            status: "Success",
            message: `todos available for ` + req.user.email,
            count: data.length,
            data: resultArray,
          });
        }
      });
  } catch (e) {
    return res.send({
      code: 400,
      status: "failure",
      message: "error" + e,
    });
  }
};
