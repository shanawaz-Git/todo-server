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
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.send({
      error: "Incorrect Email or Password",
    });
  }
};

exports.todoPost = async (req, res) => {
  try {
    var { title, category, summary, state, sys_id } = req.body;
    if (!title || !category || !summary || !state) {
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
                    message: "success",
                  });
                });
            } else {
              return res.send({ message: "data up-to-date" });
            }
          } else {
            return res.send({
              error: "ID may not be empty",
            });
          }
        })
        .catch((e) => {
          return res.send({
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
            message: "todo added successfully",
          });
        })
        .catch((e) => {
          return res.send({
            error: e,
          });
        });
    }
  } catch (e) {
    return res.send({
      error: "error" + e,
    });
  }
};
