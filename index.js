4; // Get the express app from the app module
const app = require("./app");
const http = require("http");

// This contains the enviroment variables
const config = require("./utils/config");
const logger = require("./utils/logger");

const PORT = process.env.PORT || config.PORT;

// Links the server to http and creates a socket
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000/",
  },
});

// Connect a user to the app
io.on("connection", (socket) => {
  console.log("a user is connected");
  socket.on("disconnect", () => {
    logger.info("user disconnected");
  });
});

// Let server listen on local port  from .env
app.listen(PORT, () => {
  logger.info(`server is running on port ${PORT}`);
});
