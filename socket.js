const http = require('http');
const app = require('./app')
const {Server} = require('socket.io')

// Initialize a server for the app
const server = http.createServer(app)

// Create a new socket for app
const io = new Server('app')