"use strict";

const { validateToken } = require("../helpers/authentication");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const currentPath = req.path;
    console.log(currentPath);
    if (
      currentPath === "/post/signin" ||
      currentPath === "/post/signup" ||
      currentPath === "/post/logout" ||
      currentPath === "/post/exp/add" ||
      currentPath === "/post/aitest" ||
      currentPath === "/itsmresponse" ||
      currentPath === "/post/notestaker/add" ||
      currentPath === "/post/notestaker/regUser" ||
      currentPath === "/"
    ) {
      return next(); // Skip token validation for signin and signup
    }
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      return next("token cannot be empty" + currentPath);
    }

    try {
      const userPayload = validateToken(tokenCookieValue);
      if (userPayload) {
        req.user = userPayload;
        return next();
      }
    } catch (error) {
      return next(error);
    }
  };
}

function errorHandler(err, req, res, next) {
  res.status(500).json({
    code: 500,
    status: "failure",
    error: err,
  });
}

module.exports = {
  checkForAuthenticationCookie,
  errorHandler,
};
