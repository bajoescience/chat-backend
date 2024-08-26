const User = require("../models/users");
const jwt = require("jsonwebtoken");
const config = require("./config");

const errorHandler = (err, req, res, next) => {
  console.log(err);
  next(err);
};

const getToken = (req, res, next) => {
  const auth = req.get("authorization");

  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    req.token = auth.substring(7);
  }
  next();
};

const userExtractor = async (req, res, next) => {
  const token = req.token;

  const decodedToken = jwt.verify(token, config.SECRET);
  if (!decodedToken) {
    req.user = null;
  }
  const user = await User.findById(decodedToken.id);
  req.user = user;
  next();
};

const date = (req, res, next) => {
  const date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  req.date = strTime;
  next();
};

module.exports = {
  errorHandler,
  getToken,
  userExtractor,
  date,
};
