const http = require("http");

const express = require("express");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("Public"));

io.on("connection", (socket) => {
  socket.on("message", (data) => {
    io.sockets.emit("message", data);
  });

  socket.on("typing", (name) => {
    socket.broadcast.emit("typing", name ? name : "Unknown");
  });

  socket.on("notyping", () => {
    socket.broadcast.emit("notyping");
  });
});

server.listen(3000, () => {
  console.log("Server is running");
});
