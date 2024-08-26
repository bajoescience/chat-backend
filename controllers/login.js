const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/users");
const config = require("../utils/config");

// log a user in
loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  // Confirm if username exists
  const user = await User.findOne({ username });

  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash).catch((err) => false);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      err: "invalid username or password",
    });
  }

  // create token to uniquely identify user
  const userForToken = {
    username: username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, config.SECRET);
  const resObj = {
    token,
    user: {
      username,
      firstName: user.firstName,
      lastName: user.lastName,
      id: user._id,
    },
  };
  res.status(200).send(resObj);
});

module.exports = loginRouter;
