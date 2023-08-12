const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
//----
const postRoute = require("./routes/postRoute");
const getRoute = require("./routes/getRoute");
const putRoute = require("./routes/putRoute");
const deleteRoute = require("./routes/deleteRoute");
//----
require("./db/db-config1");
const {
  checkForAuthenticationCookie,
  errorHandler,
} = require("./middleware/authentication");
//----
const app = express();
const PORT = process.env.PORT || 5015;
//----
// const corsOptions = {
//   origin: "https://todo-front-one.vercel.app", // Replace with your frontend domain
//   credentials: true, // Allow credentials (cookies, HTTP authentication, etc.)
// };
const corsOptions = {
  origin: process.env.FRONTENDORIGIN, // Replace with your frontend domain
  credentials: true, // Allow credentials (cookies, HTTP authentication, etc.)
};
app.use(cors(corsOptions));
//----
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(errorHandler);
app.use(bodyParser.json());
//----
app.use("/", getRoute.routes);
app.use("/post", postRoute.routes);
// app.use("/put", putRoute.routes);
// app.use("/delete", deleteRoute.routes);
//----
app.listen(PORT, () => {
  console.log(`the server is running in locahost:${PORT}`);
});
