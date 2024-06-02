require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const PORT = 4000 || process.env.PORT;
const DB = process.env.DB;
const Empl = require('./models/model');
const Single1 = require('./models/single1');
const Single2 = require('./models/single2');
const Multiple = require('./models/multiple');

app.use(cors());
app.use(express.json());

mongoose.connect(DB)
.then(console.log('DB connected..'))
.catch(err => console.log('DB connect fail..'))

const server = http.createServer(app);
const io = socketIo(server);

const generateSingle1 = async () => {
  const result = await Empl.find({});
  if(result && result.length > 0) {
    const len = result.length;
    const {emplName, emplKnox, emplGender} = result[Math.floor(Math.random() * len)];
    const res = await Single1.deleteMany({});
    if(res) {
      await new Single1({emplName, emplKnox, emplGender}).save();
    }
  }
}

const generateSingle2 = async () => {    // all female
  const result = await Empl.find({emplGender: "Female"});
  if(result && result.length > 0) {
    const len = result.length;
    const {emplName, emplKnox, emplGender} = result[Math.floor(Math.random() * len)];
    const res = await Single2.deleteMany({});
    if(res) {
      await new Single2({emplName, emplKnox, emplGender}).save();
    }
  }
}

// =======================

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to pick random 6 different strings
function pickRandomStrings(array, count = 6) {
  if (array.length < count) {
    throw new Error('Array does not have enough elements to pick from');
  }
  shuffle(array);
  return array.slice(0, count);
}

const generateMultiple = async () => {
  try {
    const femaleRes = await Empl.find({emplGender: "Female"});
    const maleRes = await Empl.find({emplGender: "Male"});
    const randomFemales = pickRandomStrings(femaleRes, 2);
    const randomMales = pickRandomStrings(maleRes, 6);
    const res = await Multiple.deleteMany({});

    const rf1 = {emplName: randomFemales[0].emplName, emplKnox: randomFemales[0].emplKnox, emplGender: randomFemales[0].emplGender}
    const rm1 = {emplName: randomMales[0].emplName, emplKnox: randomMales[0].emplKnox, emplGender: randomMales[0].emplGender}
    const rm2 = {emplName: randomMales[1].emplName, emplKnox: randomMales[1].emplKnox, emplGender: randomMales[1].emplGender}
    const rm3 = {emplName: randomMales[2].emplName, emplKnox: randomMales[2].emplKnox, emplGender: randomMales[2].emplGender}

    const rf2 = {emplName: randomFemales[1].emplName, emplKnox: randomFemales[1].emplKnox, emplGender: randomFemales[1].emplGender}
    const rm4 = {emplName: randomMales[3].emplName, emplKnox: randomMales[3].emplKnox, emplGender: randomMales[3].emplGender}
    const rm5 = {emplName: randomMales[4].emplName, emplKnox: randomMales[4].emplKnox, emplGender: randomMales[4].emplGender}
    const rm6 = {emplName: randomMales[5].emplName, emplKnox: randomMales[5].emplKnox, emplGender: randomMales[5].emplGender}

    if(res) {
    await new Multiple({team1: [rf1, rm1, rm2, rm3], team2: [rf2, rm4, rm5, rm6]}).save();
    }
  } catch (err) {
    console.log({error: err.message})
  }
}

const deleteAllData = async () => {
  try {
    await Empl.deleteMany({})
    await Single1.deleteMany({})
    await Single2.deleteMany({})
    await Multiple.deleteMany({})
  } catch (error) {
    console.log(error);
  }
}

const emitTotalConnections = () => {
  const totalConnections = io.sockets.sockets.size - 1;
  io.emit('active_connections', { totalConnections });
}

io.on('connection', (socket) => {
  console.log('New client connected');
  emitTotalConnections();

  socket.on('idle', () => {
    io.emit('idle');
  });

  socket.on('load_game1', () => {
    io.emit('load_game1');
    generateSingle1();
  });

  socket.on('load_game2', () => {
    io.emit('load_game2');
    generateSingle2();
  });

  socket.on('load_game3', () => {
    io.emit('load_game3');
    generateMultiple();
  });

  socket.on('countdown_game1', () => {
    io.emit('countdown_game1');
  });

  socket.on('countdown_game2', () => {
    io.emit('countdown_game2');
  });

  socket.on('countdown_game3', () => {
    io.emit('countdown_game3');
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

  socket.on('clear_data', () => {
    console.log("clear server");
    deleteAllData();
    io.emit('clear_local');
  })

  // ============================

  socket.on('test_idle', () => {
    io.emit('test_idle');
  });

  socket.on('test_load_game1', () => {
    io.emit('test_load_game1');
  });

  socket.on('test_load_game2', () => {
    io.emit('test_load_game2');
  });

  socket.on('test_load_game3', () => {
    io.emit('test_load_game3');
  });

  socket.on('test_countdown_game1', () => {
    io.emit('test_countdown_game1');
  });

  socket.on('test_countdown_game2', () => {
    io.emit('test_countdown_game2');
  });

  socket.on('test_countdown_game3', () => {
    io.emit('test_countdown_game3');
  });

  socket.on('test_result_game1', () => {
    io.emit('test_result_game1');
  });

  socket.on('test_result_game2', () => {
    io.emit('test_result_game2');
  });

  socket.on('test_result_game3', () => {
    io.emit('test_result_game3');
  });

  // ============================


  socket.on('disconnect', () => {
    console.log('Client disconnected');
    emitTotalConnections();
  });
});

app.get("/", (req, res) => res.send("Helloo..."))

const routers = require("./routes/route");
app.use('/', routers);

server.listen(PORT, () => {
  console.log('Listening on port 4000');
});