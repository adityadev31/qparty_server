const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require("cors");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('idle', () => {
    io.emit('idle');
  });

  socket.on('load_game1', () => {
    io.emit('load_game1');
  });

  socket.on('load_game2', () => {
    io.emit('load_game2');
  });

  socket.on('load_game3', () => {
    io.emit('load_game3');
  });

  socket.on('countdown_game1', () => {
    io.emit('countdown_game1');
  });

  socket.on('countdown_game2', () => {
    io.emit('countdown_game2');
  });

  socket.on('countdown_game3', () => {
    io.emit('countdown_game4');
  });

  socket.on('result_game1', () => {
    io.emit('result_game1');
  });

  socket.on('result_game2', () => {
    io.emit('result_game2');
  });

  socket.on('result_game3', () => {
    io.emit('result_game3');
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(4000, () => {
  console.log('Listening on port 4000');
});