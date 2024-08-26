const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");

const config = require("./utils/config");
const logger = require("./utils/logger");

const middleware = require("./utils/middleware");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const messageRouter = require("./controllers/message");
const notifRouter = require("./controllers/notif");

const path = require("path");
const { dirname } = require("path");
const compression = require("compression");
const appDir = dirname(require.main.filename);

// Connect to mongoDB atlas database
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to mongoDB");
  })
  .catch((e) => {
    logger.info(`error connecting to mongoDB: ${e}`);
  });

// Compress files for optimal loading
app.use(compression());

// Allow frontend on different port to access backend
app.use(cors());

// Serve frontend files to the backend
app.use(express.static("build"));

// Change req body to JSON
app.use(express.json());

// access middlewares before loading the routes
app.use(middleware.date);
app.use(middleware.getToken);
app.use(middleware.errorHandler);

// We need to connect the server.io
app.use("/api/messages", messageRouter);
app.use("/api/users", usersRouter);
app.use("/api/notif", notifRouter);
app.use("/api/login", loginRouter);

// Catch all route
// To handle client routing
app.get("*", (req, res) => {
  res.sendFile(path.join(appDir, "build", "index.html"));
});

module.exports = app;
