"use strict";

const JWT = require("jsonwebtoken");

require("dotenv").config();
const secret = process.env.SECRET;
const jwttimeout = process.env.JWTTIMEOUTINSECONDS;
var options = {};

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };
  if (jwttimeout) {
    options = {
      expiresIn: jwttimeout,
    };
  }
  const token = JWT.sign(payload, secret, options);
  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, secret);
  return payload;
}

module.exports = {
  createTokenForUser,
  validateToken,
};
