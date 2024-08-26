const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/users");
const _ = require("lodash");
const Notif = require("../models/notif");
const users = require("../models/users");
const db = require("../db.json");

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("notif");
  res.json(users);
});

usersRouter.get("/admin", async (req, res) => {
  const admins = await User.find({}).limit(4);
  res.json(admins);
});

usersRouter.get("/:id", async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({
      err: "User id must be given",
    });
  }
  const user = await User.findById(req.params.id).populate("notif");

  if (!user) {
    return res.status(404).json({
      err: "User does not exist",
    });
  }

  res.json(user);
});

usersRouter.get("/getmessages/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id)
    .populate("messages")
    .sort({ sortNumber: 1 });
  const messages = user.messages;
  res.json(messages);
});

// Set all users except from current user as current user's contact
usersRouter.get("/getcontacts/:username", async (req, res) => {
  const username = req.params.username;

  // Get all contacts apart from users
  const contacts = await User.find({ username: { $ne: username } }).populate(
    "notif"
  );

  res.json(contacts);
});

usersRouter.post("/", async (req, res) => {
  const { username, firstName, lastName, email, password } = req.body;

  // Confirm if user exists or not
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({
      err: "Username already exists",
    });
  }

  // Hash password
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    firstName,
    lastName,
    email,
    passwordHash,
  });

  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

// Initialize database
usersRouter.post("/init", async (req, res) => {
  // Delete all users
  await User.deleteMany({});

  // Fetch init data from db.json
  // and initialize database
  const userPromiseArr = db.map(async (user) => {
    const { username, firstname, lastname, email, password } = user;

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    return new User({
      username,
      firstName: firstname,
      lastName: lastname,
      email,
      passwordHash,
    }).save();
  });

  await Promise.all(userPromiseArr);

  res.status(200).send();
});

module.exports = usersRouter;
