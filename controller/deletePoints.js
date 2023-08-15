"use strict";
const User = require("../schemas/userSchema");
const { todo } = require("../schemas/todosSchema");

exports.deletetodo = async (req, res) => {
  try {
    var { sys_id } = req.body;
    console.log(sys_id);
    todo
      .findOneAndDelete({ _id: sys_id })
      .then((deletedDocument) => {
        console.log(deletedDocument);
        if (deletedDocument) {
          return res.status(200).send({
            code: 200,
            status: "success",
            message: "deletion success",
          });
        } else {
          return res.status(201).send({
            code: 201,
            status: "Failure",
            message: "nothing to delete",
          });
        }
      })
      .catch((err) => {
        return res.status(400).send({
          code: 400,
          status: "Failure",
          message: "error " + err,
        });
      });
  } catch (error) {
    return res.status(400).send({
      code: 400,
      status: "failure",
      message: "error" + error,
    });
  }
};
