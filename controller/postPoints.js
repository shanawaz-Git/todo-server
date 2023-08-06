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
    return res.send(error);
  }
  return res.redirect("/");
};

exports.logout = async (req, res) => {
  res.clearCookie("token").redirect("/");
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.send({ error: "email/password cannot be emppty" });
    }
    const token = await User.matchPasswordAndGenerateToken(email, password);
    const cookieOptions = {
      httpOnly: true, // Recommended for sensitive cookies
      secure: true, // Recommended for cookies transmitted over HTTPS
      sameSite: "None", // Allow the cookie to be sent with cross-site requests
    };
    return res.cookie("token", token, cookieOptions).send({
      code: 200,
      status: "success",
      message: "signin success",
    });
  } catch (error) {
    return res.send({
      code: 400,
      status: "failure",
      error: "Incorrect Email or Password",
    });
  }
};

exports.todoPost = async (req, res) => {
  try {
    var { title, category, summary, state, sys_id } = req.body;
    if (!title || !category || !summary) {
      return res.send({
        error:
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
                  return res.send({
                    code: 200,
                    status: "success",
                    message: "todo updated",
                  });
                });
            } else {
              return res.send({
                code: 200,
                status: "success",
                message: "data up-to-date",
              });
            }
          } else {
            return res.send({
              code: 202,
              status: "failure",
              error: "ID may not be empty",
            });
          }
        })
        .catch((e) => {
          return res.send({
            code: 400,
            status: "failure",
            error: e,
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
          return res.send({
            code: 200,
            status: "success",
            message: "todo added successfully",
          });
        })
        .catch((e) => {
          return res.send({
            code: 400,
            status: "failure",
            error: e,
          });
        });
    }
  } catch (e) {
    return res.send({
      coed: 401,
      status: "failure",
      error: "error" + e,
    });
  }
};
