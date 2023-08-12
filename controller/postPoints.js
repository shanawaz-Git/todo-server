"use strict";
const User = require("../schemas/userSchema");
const { todo } = require("../schemas/todosSchema");

exports.signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    await User.create({
      fullName,
      email,
      password,
    });
  } catch (error) {
    if (error.code == 11000) {
      return res.status(400).send({
        code: 400,
        status: "failure",
        message: "User already exist",
      });
    }
    return res.status(400).send({
      code: 400,
      status: "failure",
      message: "error" + error,
    });
  }
  return res.status(200).send({
    code: 200,
    status: "success",
    message: "signup success",
  });
};

exports.logout = async (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .send({ code: 200, status: "success", message: "logout success" });
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).send({
        code: 400,
        status: "failure",
        message: "email/password cannot be empty",
      });
    }
    const token = await User.matchPasswordAndGenerateToken(email, password);
    const cookieOptions = {
      httpOnly: true, // Recommended for sensitive cookies
      secure: true, // Recommended for cookies transmitted over HTTPS
      sameSite: "None", // Allow the cookie to be sent with cross-site requests
    };
    return res.cookie("token", token, cookieOptions).status(200).send({
      code: 200,
      status: "success",
      message: "signin success",
    });
  } catch (error) {
    return res.status(400).send({
      code: 400,
      status: "failure",
      message: "Incorrect Email or Password",
    });
  }
};

exports.todoPost = async (req, res) => {
  try {
    var { title, category, summary, state, sys_id } = req.body;
    if ((!title || !category || !summary) && !sys_id) {
      return res.status(400).send({
        code: 400,
        status: "success",
        message:
          "please fill all the mandatory fields (title,category,summary,state)",
      });
    }
    if (sys_id) {
      await todo
        .find({ _id: new Object(sys_id) })
        .then(async (data) => {
          if (data.length != 0) {
            if (
              data[0].title != title ||
              data[0].category != category ||
              data[0].summary != summary ||
              data[0].state != state
            ) {
              await todo
                .updateOne(data[0], {
                  $set: {
                    title: title,
                    category: category,
                    summary: summary,
                    state: state,
                  },
                })
                .then(() => {
                  return res.status(200).send({
                    code: 200,
                    status: "success",
                    message: "todo updated",
                  });
                });
            } else {
              return res.status(200).send({
                code: 200,
                status: "success",
                message: "data up-to-date",
              });
            }
          } else {
            return res.status(202).send({
              code: 202,
              status: "failure",
              message: "ID may not be empty",
            });
          }
        })
        .catch((e) => {
          return res.status(400).send({
            code: 400,
            status: "failure",
            message: e,
          });
        });
    } else {
      const createTodo = new todo({
        title: title,
        category: category,
        summary: summary,
        state: state,
        createdBy: req.user._id,
      });
      await createTodo
        .save()
        .then(async () => {
          return res.status(200).send({
            code: 200,
            status: "success",
            message: "todo added successfully",
          });
        })
        .catch((e) => {
          return res.status(400).send({
            code: 400,
            status: "failure",
            message: e,
          });
        });
    }
  } catch (e) {
    return res.status(401).send({
      coed: 401,
      status: "failure",
      message: "error" + e,
    });
  }
};
