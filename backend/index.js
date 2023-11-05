// express server
import express from "express";
const app = express();

import { createServer } from "http";
const server = createServer(app);

import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3000;

// socket
import { Server } from "socket.io";
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// socket events
io.on("connection", (socket) => {
  // console.log("socket connection has ", socket);
  console.log(" socket connection are active to  be connected");

  socket.on("chat", (payload) => {
    console.log("payload is ", payload);
    io.emit("chat", payload);
  });
});

server.listen(PORT, () => {
  console.log(`server running in http://localhost:${PORT}`);
});
